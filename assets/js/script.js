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

// ===== 编辑模式 =====
let editMode = false;
const editBtn = document.getElementById('editToggleBtn');
const saveBtn = document.getElementById('saveHtmlBtn');

editBtn.addEventListener('click', function() {
    editMode = !editMode;
    if (editMode) {
        document.body.classList.add('edit-mode');
        this.classList.add('active');
        this.textContent = '完成';
        document.querySelectorAll('h1, h2, h3, h4, h5, p, li, .intro-text, .bio-name, .bio-target, .bio-summary, .bio-exp-company, .bio-exp-role, .bio-exp-details li, .bio-info-item, .bio-sidebar ul li, .tag-list li, .track-card p, .track-card div, .paper-title, .paper-journal, .paper-abstract p, .work-title, .work-desc, .contact-info h4, .contact-info p, .nav-links a').forEach(el => {
            if (!el.closest('nav') && !el.closest('a[href]') && !el.closest('.file-link')) el.contentEditable = 'true';
        });
    } else {
        document.body.classList.remove('edit-mode');
        this.classList.remove('active');
        this.textContent = '编辑';
        document.querySelectorAll('[contenteditable="true"]').forEach(el => el.contentEditable = 'false');
    }
});

saveBtn.addEventListener('click', function() {
    const html = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'index.html';
    document.body.appendChild(a); a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    this.textContent = '已存';
    setTimeout(() => { this.textContent = '保存'; }, 2000);
});

document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
        if (e.key === 'e') { e.preventDefault(); editBtn.click(); }
        if (e.key === 's') { e.preventDefault(); saveBtn.click(); }
    }
});
