// @Fn/ui#handleFormSubmit
document.getElementById('url-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = document.getElementById('long-url').value;
    const res = await fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    const data = await res.json();
    if (data.shortUrl) {
      const result = document.getElementById('result');
      result.textContent = data.shortUrl;
      navigator.clipboard.writeText(data.shortUrl);
    } else {
      alert(data.error);
    }
  });