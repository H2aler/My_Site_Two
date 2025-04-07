const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// JWT 시크릿 키
const JWT_SECRET = process.env.JWT_SECRET;

// OAuth 설정
const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID;
const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;
const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;
const NAVER_REDIRECT_URI = process.env.NAVER_REDIRECT_URI;

// 카카오 로그인 라우트
app.get('/auth/kakao', (req, res) => {
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
    res.redirect(kakaoAuthURL);
});

// 카카오 콜백 처리
app.get('/auth/kakao/callback', async (req, res) => {
    try {
        const { code } = req.query;
        
        // 액세스 토큰 받기
        const tokenResponse = await axios.post('https://kauth.kakao.com/oauth/token', null, {
            params: {
                grant_type: 'authorization_code',
                client_id: KAKAO_CLIENT_ID,
                redirect_uri: KAKAO_REDIRECT_URI,
                code,
            },
        });

        const { access_token } = tokenResponse.data;

        // 사용자 정보 받기
        const userResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        const { id, kakao_account } = userResponse.data;
        
        // JWT 토큰 생성
        const token = jwt.sign(
            {
                id,
                email: kakao_account.email,
                provider: 'kakao',
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        // 프론트엔드로 리다이렉트 (토큰 포함)
        res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
    } catch (error) {
        console.error('카카오 로그인 에러:', error);
        res.status(500).json({ error: '로그인 처리 중 오류가 발생했습니다.' });
    }
});

// 네이버 로그인 라우트
app.get('/auth/naver', (req, res) => {
    const state = Math.random().toString(36).substr(2, 11);
    const naverAuthURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=${state}`;
    res.redirect(naverAuthURL);
});

// 네이버 콜백 처리
app.get('/auth/naver/callback', async (req, res) => {
    try {
        const { code, state } = req.query;

        // 액세스 토큰 받기
        const tokenResponse = await axios.post('https://nid.naver.com/oauth2.0/token', null, {
            params: {
                grant_type: 'authorization_code',
                client_id: NAVER_CLIENT_ID,
                client_secret: NAVER_CLIENT_SECRET,
                code,
                state,
            },
        });

        const { access_token } = tokenResponse.data;

        // 사용자 정보 받기
        const userResponse = await axios.get('https://openapi.naver.com/v1/nid/me', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        const { response: userInfo } = userResponse.data;

        // JWT 토큰 생성
        const token = jwt.sign(
            {
                id: userInfo.id,
                email: userInfo.email,
                provider: 'naver',
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        // 프론트엔드로 리다이렉트
        res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
    } catch (error) {
        console.error('네이버 로그인 에러:', error);
        res.status(500).json({ error: '로그인 처리 중 오류가 발생했습니다.' });
    }
});

// JWT 토큰 검증 미들웨어
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: '인증 토큰이 필요합니다.' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: '유효하지 않은 토큰입니다.' });
        }
        req.user = user;
        next();
    });
};

// 보호된 라우트 예시
app.get('/api/protected', authenticateToken, (req, res) => {
    res.json({ user: req.user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`);
}); 