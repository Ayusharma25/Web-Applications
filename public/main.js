const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;

    const toggle = document.querySelector('[data-theme-toggle]');
    if (!toggle) {
        return;
    }

    const isDark = theme === 'dark';
    toggle.setAttribute('aria-pressed', String(isDark));
    toggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
    toggle.querySelector('.theme-toggle-icon').textContent = isDark ? '☀' : '☾';
};

const savedTheme = localStorage.getItem('theme');
const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
applyTheme(savedTheme || preferredTheme);

document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('[data-theme-toggle]');
    if (!toggle) {
        return;
    }

    toggle.addEventListener('click', () => {
        const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', nextTheme);
        applyTheme(nextTheme);
    });
});

function deleteProduct(id) {
    const result = confirm("Delete this product? This action cannot be undone.");
    if (result) {
        fetch(`/delete-product/` + id, {
            method: 'POST'
        }).then((res) => {
            if(res.ok) {
                window.location.reload();
            }
        });
    }
}
