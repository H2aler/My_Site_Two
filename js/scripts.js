// 드래그 기능 구현
const draggableButton = document.getElementById('draggableButton');
const info = document.getElementById('info');

let isDragging = false; // 드래그 상태 변수
let offsetX, offsetY; // 드래그 시 버튼 위치 보정 값

// 드래그 시작
draggableButton.addEventListener('mousedown', function(event) {
    isDragging = true;
    offsetX = event.clientX - draggableButton.getBoundingClientRect().left;
    offsetY = event.clientY - draggableButton.getBoundingClientRect().top;

    // 정보 표시
    info.style.display = 'block';
    updateInfoPosition(event.clientX, event.clientY);

    document.addEventListener('mousemove', mouseMoveHandler);
});

// 드래그 중
function mouseMoveHandler(event) {
    if (isDragging) {
        draggableButton.style.position = 'absolute';
        draggableButton.style.left = (event.clientX - offsetX) + 'px';
        draggableButton.style.top = (event.clientY - offsetY) + 'px';

        // 정보 위치 업데이트
        updateInfoPosition(event.clientX, event.clientY);
    }
}

// 드래그 종료
document.addEventListener('mouseup', function() {
    isDragging = false;
    document.removeEventListener('mousemove', mouseMoveHandler);
});

// 버튼 클릭 시 정보 창 닫기
draggableButton.addEventListener('click', function() {
    info.style.display = 'none'; // 정보 숨기기
});

// 정보 위치 업데이트 함수
function updateInfoPosition(x, y) {
    const buttonRect = draggableButton.getBoundingClientRect();
    // 버튼의 중앙에 정보 위치 조정
    info.style.left = `${buttonRect.left + buttonRect.width / 2 - info.offsetWidth / 2}px`;
    info.style.top = `${buttonRect.bottom + 5}px`; // 버튼 아래에 표시
}











// Hero Section
const taglines = [
    "자신의 속도에 맞춰 배우세요",
    "실수는 배움의 일부입니다.\n두려워하지 말고 계속 도전하세요!", // 줄바꿈 추가
    "매일 새로운 것을 배우는 것이 중요합니다", // 새로운 태그라인 추가
    "언어는 문화의 로드맵입니다" // 새로운 태그라인 추가
];

let currentTagline = 0;
const taglineElement = document.getElementById('rotating-tagline');

// 배경 색상 배열
// 배경 색상 배열 (세련되고 고급스러운 색상 조합)
/*
const backgroundGradients = [
    "linear-gradient(to right, #1a1a1a, #4e4e4e)", // 다크 그레이 그라데이션
    "linear-gradient(to right, #4B0082, #8A2BE2)", // 인디고에서 블루바이올렛으로
    "linear-gradient(to right, #00BFFF, #87CEEB)", // 하늘색에서 연한 하늘색으로
    "linear-gradient(to right, #2c3e50, #bdc3c7)"  // 다크 블루에서 연한 회색으로
];
*/

// 1.3초마다 태그라인 변경
setInterval(() => {
    currentTagline = (currentTagline + 1) % taglines.length;
    taglineElement.innerHTML = taglines[currentTagline].replace(/\n/g, "<br>"); // 줄바꿈을 <br>로 변환

    /*
    // 배경 색상 변경
    document.body.style.backgroundColor = backgroundColors[currentColorIndex];
    currentColorIndex = (currentColorIndex + 1) % backgroundColors.length;

    // 텍스트 색상 변경 (배경에 따라)
    taglineElement.style.color = (currentColorIndex === 0) ? "white" : "black"; // 검정 배경일 때 흰색, 나머지 하늘색일 때 검정색

    */
}, 1700); // 1.7초마다 변경

function openModal() {
    document.getElementById('contactModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('contactModal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('contactModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}





// 검색 관련 코드
document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const searchBar = document.querySelector('.search-bar');
    const clearButton = document.querySelector('.clear-button');
    const resultsContainer = document.getElementById('search-results');

    // 검색 폼 제출 시
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchBar.value.trim();
        handleSearch(query);
    });

    // 검색어 입력 필드 클리어
    clearButton.addEventListener('click', () => {
        searchBar.value = '';
        searchBar.focus();
        clearSearchResults();
    });

    // Enter 키 입력 시
    searchBar.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const query = searchBar.value.trim();
            handleSearch(query);
        }
    });
});

// 검색 처리 함수
function handleSearch(query) {
    const resultsContainer = document.getElementById('search-results');
    
    if (query) {
        // 검색 결과 표시
        resultsContainer.innerHTML = `
            <div class="search-result-item">
                <strong>"${query}"</strong>에 대한 검색 결과:
                <ul style="margin-top: 10px;">
                    <li>검색 중...</li>
                </ul>
            </div>
        `;
        resultsContainer.style.display = 'block';
        
        // 실제 검색 로직은 여기에 구현
        // 예: API 호출 또는 데이터 필터링
    } else {
        clearSearchResults();
        alert('검색어를 입력하세요.');
    }
}

// 검색 결과 지우기 함수
function clearSearchResults() {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.style.display = 'none';
    resultsContainer.innerHTML = '';
}






/*로그인*/
function openLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // 입력 필드 포커스
    setTimeout(() => {
        document.getElementById('username').focus();
    }, 300);
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
    resetLoginForm();
}

function resetLoginForm() {
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('rememberMe').checked = false;
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // 여기에 실제 로그인 로직 구현
    console.log('로그인 시도:', { username, rememberMe });
    
    // 임시 성공 메시지
    showLoginSuccess();
}

function showLoginSuccess() {
    const loginBtn = document.querySelector('.login-btn');
    loginBtn.innerHTML = '로그인 성공! <span class="success-icon">✓</span>';
    loginBtn.classList.add('success');
    
    setTimeout(() => {
        closeLoginModal();
        loginBtn.innerHTML = '로그인';
        loginBtn.classList.remove('success');
    }, 1500);
}
function socialLogin(provider) {
    console.log(`${provider} 로그인 시도`);
    // 소셜 로그인 구현
}

function showSignup() {
    closeLoginModal();
    // 회원가입 페이지로 이동 또는 모달 전환
    console.log('회원가입 페이지로 이동');
}

// 비밀번호 토글 기능 단순화
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleButton = document.querySelector('.password-toggle');
    const isPasswordVisible = passwordInput.type === 'password';
    
    // 비밀번호 입력 타입 토글
    passwordInput.type = isPasswordVisible ? 'text' : 'password';
    
    // SVG 아이콘 템플릿
    const eyeOpenIcon = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
        </svg>`;
        
    const eyeClosedIcon = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
        </svg>`;

    // 버튼 상태 업데이트    
    toggleButton.innerHTML = isPasswordVisible ? eyeOpenIcon : eyeClosedIcon;
    toggleButton.setAttribute('title', isPasswordVisible ? '비밀번호 숨기기' : '비밀번호 보기');
}




// 팝업 열기 버튼 클릭 시 이벤트
document.getElementById("openQuizButton").addEventListener("click", function() {
    document.getElementById("quizPopup").style.display = "flex"; // 팝업 열기
});

// 팝업 닫기 버튼 클릭 시 이벤트
document.querySelector(".close-button").addEventListener("click", function() {
    document.getElementById("quizPopup").style.display = "none"; // 팝업 닫기
});

// 팝업 외부 클릭 시 닫기
document.getElementById("quizPopup").addEventListener("click", function(event) {
    if (event.target === this) { // 팝업 자체를 클릭한 경우
        this.style.display = "none"; // 팝업 닫기
    }
});





// 모달 열기 및 닫기 기능
const openQuizButton = document.getElementById('openQuizButton');
const quizPopup = document.getElementById('quizPopup');
const closeButton = document.querySelector('.close-button');
const optionButtons = document.querySelectorAll('.option-button');
const resultText = document.getElementById("result");
const correctAnswer = "안녕하세요, 잘 지내세요?";

openQuizButton.addEventListener('click', () => {
    quizPopup.style.display = 'flex'; // 모달 열기
});

closeButton.addEventListener('click', () => {
    quizPopup.style.display = 'none'; //  닫기
    resultText.textContent = ''; // 결과 초기화
});

optionButtons.forEach(button => {
    button.addEventListener('click', function() {
        const userAnswer = this.getAttribute("data-answer");
        if (userAnswer === correctAnswer) {
            resultText.textContent = "정답입니다! 잘 하셨어요!";
            resultText.style.color = "green";
        } else {
            resultText.textContent = "틀렸습니다. 다시 시도해보세요.";
            resultText.style.color = "red";
        }
    });
});

// 모달 외부 클릭 시 닫기
window.onclick = function(event) {
    if (event.target === quizPopup) {
        quizPopup.style.display = 'none';
        resultText.textContent = ''; // 결과 초기화
    }
};








/*지도*/
var map = L.map('map').setView([37.518984, 126.938916], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

var marker = L.marker([37.518984, 126.938916]).addTo(map)
    .bindPopup('한불 언어마을(37.518984, 126.938916)').openPopup();


// 모바일 메뉴 관리
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const menuOverlay = document.querySelector('.menu-overlay');
    const navItems = document.querySelectorAll('.nav-links a');

    // 메뉴 토글 기능
    menuToggle.addEventListener('click', toggleMenu);

    // 오버레이 클릭시 메뉴 닫기
    menuOverlay.addEventListener('click', closeMenu);

    // 각 메뉴 항목 클릭시 메뉴 닫기
    navItems.forEach(item => {
        item.addEventListener('click', closeMenu);
    });

    function toggleMenu() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    function closeMenu() {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // 화면 리사이즈시 메뉴 상태 초기화
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
});

// 문의하기 모달 관련 함수들
function openContactModal() {
    const modal = document.getElementById('contactModal');
    document.body.style.overflow = 'hidden';
    modal.style.display = 'flex';
    
    requestAnimationFrame(() => {
        modal.classList.add('show');
    });
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.remove('show');
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }, 300);
}

function handleContactSubmit() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.contact-btn.submit');
    const originalText = submitBtn.textContent;
    
    if (!form.checkValidity()) {
        return;
    }
    
    // 버튼 로딩 상태
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="loading-spinner"></span>전송 중...';
    
    // 폼 데이터 수집
    const formData = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        message: document.getElementById('contactMessage').value
    };
    
    // 실제 서버 전송 로직을 여기에 구현
    setTimeout(() => {
        submitBtn.innerHTML = '✓ 전송완료!';
        submitBtn.style.background = '#2ecc71';
        
        setTimeout(() => {
            closeContactModal();
            // 폼 초기화
            form.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
        }, 1500);
    }, 1500);
}

// 모달 외부 클릭 시 닫기
document.getElementById('contactModal').addEventListener('click', (e) => {
    if (e.target.id === 'contactModal') {
        closeContactModal();
    }
});

// ESC 키로 모달 닫기
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('contactModal').classList.contains('show')) {
        closeContactModal();
    }
});

/*
// CTA 버튼 이벤트 핸들러 업데이트
document.querySelector('.cta-button[onclick="openModal()"]').setAttribute('onclick', 'openContactModal()');

// 비밀번호 토글 기능 최적화
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleButton = document.querySelector('.password-toggle');
    const isPasswordVisible = passwordInput.type === 'password';
    
    // 비밀번호 입력 타입 토글
    passwordInput.type = isPasswordVisible ? 'text' : 'password';
    
    // SVG 아이콘 템플릿
    const eyeOpenIcon = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
        </svg>`;
        
    const eyeClosedIcon = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
        </svg>`;

    // 버튼 상태 업데이트
    toggleButton.innerHTML = isPasswordVisible ? eyeOpenIcon : eyeClosedIcon;
    toggleButton.setAttribute('title', isPasswordVisible ? '비밀번호 숨기기' : '비밀번호 보기');
    toggleButton.setAttribute('aria-label', isPasswordVisible ? '비밀번호 숨기기' : '비밀번호 보기');
    toggleButton.setAttribute('aria-pressed', isPasswordVisible ? 'true' : 'false');
}
// 페이지 로드 시 초기 설정
document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const toggleButton = document.querySelector('.password-toggle');

    // 비밀번호 입력 시 토글 버튼 표시
    passwordInput.addEventListener('input', () => {
        toggleButton.style.visibility = passwordInput.value ? 'visible' : 'hidden';
    });

    // 초기 상태 설정
    toggleButton.style.visibility = passwordInput.value ? 'visible' : 'hidden';
});
*/


