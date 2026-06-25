// ===== 页面导航 =====
function navigate(pageId) {
    document.querySelectorAll('.page-section').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(pageId);
    if (target) { target.classList.add('active'); }
    window.scrollTo(0, 0);
    history.pushState({}, '', '#' + pageId);
}

// Handle hash on load
const hash = window.location.hash.substring(1);
if (hash && document.getElementById(hash)) { navigate(hash); }

// Handle back/forward
window.addEventListener('popstate', function() {
    const h = window.location.hash.substring(1);
    if (h && document.getElementById(h)) { navigate(h); }
    else { navigate('home'); }
});

// Nav scroll effect
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.pageYOffset > 60));

// ===== 照片上传 =====
document.getElementById('bioPhotoContainer').addEventListener('click', function() {
    document.getElementById('bioPhotoUpload').click();
});
document.getElementById('bioPhotoUpload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.getElementById('bioPhotoImg');
            img.src = e.target.result;
            img.style.display = 'block';
            document.getElementById('bioPhotoPlaceholder').style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
});

// ===== Lightbox =====
function openLightbox(src) {
    document.getElementById('lightbox-img').src = src;
    document.getElementById('lightbox').style.display = 'flex';
}
function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

