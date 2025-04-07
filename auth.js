// 소셜 로그인 처리 함수
function socialLogin(provider) {
    const baseUrl = 'http://localhost:3000'; // 백엔드 서버 주소
    
    switch (provider) {
        case 'kakao':
            window.location.href = `${baseUrl}/auth/kakao`;
            break;
        case 'naver':
            window.location.href = `${baseUrl}/auth/naver`;
            break;
        default:
            console.error('지원하지 않는 로그인 방식입니다.');
    }
}

// JWT 토큰 처리
function handleAuthCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
        // 토큰을 로컬 스토리지에 저장
        localStorage.setItem('authToken', token);
        
        // 사용자 정보 가져오기
        fetchUserInfo(token);
        
        // 메인 페이지로 리다이렉트
        window.location.href = '/';
    }
}

// 사용자 정보 가져오기
async function fetchUserInfo(token) {
    try {
        const response = await fetch('http://localhost:3000/api/protected', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error('사용자 정보를 가져오는데 실패했습니다.');
        }

        const userData = await response.json();
        console.log('사용자 정보:', userData);
        
        // 사용자 정보 UI 업데이트
        updateUserInterface(userData);
    } catch (error) {
        console.error('에러:', error);
    }
}

// UI 업데이트
function updateUserInterface(userData) {
    const loginButton = document.querySelector('.login-button');
    if (userData.user) {
        loginButton.textContent = '로그아웃';
        loginButton.onclick = logout;
    }
}

// 로그아웃
function logout() {
    localStorage.removeItem('authToken');
    window.location.reload();
}

// 페이지 로드 시 토큰 확인
document.addEventListener('DOMContentLoaded', () => {
    handleAuthCallback();
    const token = localStorage.getItem('authToken');
    if (token) {
        fetchUserInfo(token);
    }
}); 