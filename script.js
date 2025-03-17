document.addEventListener('DOMContentLoaded', function() {
    // 照片数组 - 你需要替换这些路径为你自己的照片
    const photos = [
        { src: 'images/photo1.jpg', message: '还记得我们第一次见面的场景吗？' },
        { src: 'images/photo2.jpg', message: '一起看过的第一场电影...' },
        { src: 'images/photo3.jpg', message: '那次旅行，我们走过了许多地方' },
        { src: 'images/photo4.jpg', message: '你的笑容是我最爱的风景' },
        { src: 'images/photo5.jpg', message: '和你在一起的每一刻都很珍贵' },
        { src: 'images/photo6.jpg', message: '希望未来的日子，我们一直手牵手走下去' },
        { src: 'images/photo7.jpg', message: '老婆我爱你！❤️' },
        { src: 'images/photo8.jpg', message: '愿我们的爱情，如这照片一样美好永恒' }
    ];
    
    // 获取DOM元素
    const heart = document.querySelector('.heart');
    const currentPhoto = document.getElementById('current-photo');
    const loveMessage = document.getElementById('love-message');
    const startButton = document.getElementById('start-button');
    const backgroundMusic = document.getElementById('background-music');
    const floatingHeartsContainer = document.querySelector('.floating-hearts');
    const photoContainer = document.querySelector('.photo-container');
    
    let currentPhotoIndex = 0;
    let slideshowInterval;
    let isPlaying = false;
    
    // 创建漂浮的心形
    function createFloatingHearts() {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.classList.add('floating-heart');
                
                // 随机大小
                const size = Math.random() * 15 + 10;
                heart.style.width = `${size}px`;
                heart.style.height = `${size}px`;
                
                // 随机位置
                heart.style.left = `${Math.random() * 100}%`;
                heart.style.bottom = '-20px';
                
                // 随机动画持续时间
                const duration = Math.random() * 10 + 5;
                heart.style.animation = `float ${duration}s linear infinite`;
                
                // 随机透明度
                heart.style.opacity = Math.random() * 0.5 + 0.3;
                
                floatingHeartsContainer.appendChild(heart);
                
                // 移除心形元素（避免DOM过大）
                setTimeout(() => {
                    heart.remove();
                }, duration * 1000);
            }, i * 300);
        }
    }
    
    // 更新照片和消息
    function updatePhoto(index) {
        currentPhoto.style.opacity = 0;
        
        setTimeout(() => {
            currentPhoto.src = photos[index].src;
            loveMessage.textContent = photos[index].message;
            
            // 等待图片加载完成后调整容器高度
            currentPhoto.onload = function() {
                const aspectRatio = this.naturalWidth / this.naturalHeight;
                const maxWidth = photoContainer.offsetWidth;
                const maxHeight = Math.min(
                    window.innerHeight * 0.6, // 最大高度为视窗高度的60%
                    window.innerHeight - 400  // 确保留出足够空间给其他元素
                );
                
                let newWidth = maxWidth;
                let newHeight = newWidth / aspectRatio;
                
                // 如果高度超过最大高度，则按高度计算
                if (newHeight > maxHeight) {
                    newHeight = maxHeight;
                    newWidth = newHeight * aspectRatio;
                }
                
                // 设置照片容器的高度
                photoContainer.style.height = `${newHeight}px`;
                currentPhoto.style.height = `${newHeight}px`;
                currentPhoto.style.width = 'auto';
                currentPhoto.style.maxWidth = '100%';
                currentPhoto.style.objectFit = 'contain';
                
                // 调整容器位置，确保爱心不被遮挡
                const container = document.querySelector('.container');
                const heartContainer = document.querySelector('.heart-container');
                const heartHeight = heartContainer.offsetHeight;
                container.style.marginTop = `${heartHeight + 20}px`; // 20px为额外间距
            };
            
            currentPhoto.style.opacity = 1;
        }, 500);
    }
    
    // 开始幻灯片放映
    function startSlideshow() {
        if (slideshowInterval) {
            clearInterval(slideshowInterval);
        }
        
        updatePhoto(currentPhotoIndex);
        
        // 开始播放音乐
        backgroundMusic.play().catch(e => console.log('无法自动播放音乐:', e));
        
        slideshowInterval = setInterval(() => {
            currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
            updatePhoto(currentPhotoIndex);
        }, 2000);
        
        startButton.textContent = '暂停浏览';
        isPlaying = true;
    }
    
    // 暂停幻灯片放映
    function pauseSlideshow() {
        if (slideshowInterval) {
            clearInterval(slideshowInterval);
            slideshowInterval = null;
        }
        
        // 暂停音乐
        backgroundMusic.pause();
        
        startButton.textContent = '继续浏览';
        isPlaying = false;
    }
    
    // 点击心形时的动画效果
    heart.addEventListener('click', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'heartbeat 1.5s infinite';
        }, 10);
        
        createFloatingHearts();
        
        if (!isPlaying) {
            startSlideshow();
        }
    });
    
    // 开始/暂停按钮
    startButton.addEventListener('click', function() {
        if (isPlaying) {
            pauseSlideshow();
        } else {
            startSlideshow();
        }
    });
    
    // 触摸屏幕时创建心形（移动设备）
    document.addEventListener('touchstart', function(e) {
        // 只在内容区域创建心形
        if (e.target.closest('.container')) {
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            
            const size = Math.random() * 15 + 10;
            heart.style.width = `${size}px`;
            heart.style.height = `${size}px`;
            
            const touch = e.touches[0];
            heart.style.left = `${touch.clientX}px`;
            heart.style.top = `${touch.clientY}px`;
            
            const duration = Math.random() * 5 + 3;
            heart.style.animation = `float ${duration}s linear`;
            
            floatingHeartsContainer.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, duration * 1000);
        }
    });
    
    // 初始化创建一些漂浮的心形
    createFloatingHearts();
    
    // 设置初始照片
    currentPhoto.src = 'images/photo2.jpg';
    loveMessage.textContent = '点击心形，开始我们的旅程...';
}); 