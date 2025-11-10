(function() {
  var style = document.createElement('style');
  style.textContent = `
  #thw-adblock-msg{display:none;position:fixed;bottom:0;left:0;width:100%;height:50vh;background:rgba(255,255,255,0.96);backdrop-filter:blur(6px);z-index:9999;text-align:center;font-family:'Segoe UI',Arial,sans-serif;color:#0a2a43;box-shadow:0 -3px 15px rgba(0,0,0,0.1);animation:slideUp 0.4s ease-out;}
  #thw-adblock-msg .box{position:relative;top:12%;margin:auto;background:#fff;padding:25px 30px 45px 30px;border-radius:14px;box-shadow:0 6px 20px rgba(0,0,0,0.1);max-width:420px;}
  #thw-adblock-msg strong{color:#6fa23d;}
  #thw-adblock-msg button{margin-top:15px;background:#0a2a43;color:#fff;border:none;border-radius:6px;padding:8px 18px;cursor:pointer;font-size:14px;transition:0.3s;}
  #thw-adblock-msg button:hover{background:#6fa23d;}
  #thw-logo{position:absolute;bottom:10px;left:50%;transform:translateX(-50%);display:flex;align-items:center;justify-content:center;gap:6px;font-size:13px;color:#0a2a43;opacity:0.8;}
  #thw-logo img{width:20px;height:20px;border-radius:4px;}
  @keyframes slideUp{from{transform:translateY(100%);opacity:0;}to{transform:translateY(0);opacity:1;}}
  body.thw-halfblur::after{content:"";position:fixed;top:50%;left:0;width:100%;height:50%;background:rgba(255,255,255,0.7);backdrop-filter:blur(5px);pointer-events:none;z-index:9998;}
  `;
  document.head.appendChild(style);

  var div = document.createElement('div');
  div.id = 'thw-adblock-msg';
  div.innerHTML = `
  <div class='box'>
    <h3>🩺 The Health.Wiki Apps</h3>
    <p>
      <strong>English:</strong><br>
      We noticed you’re using an <strong>ad blocker</strong>.<br>
      Ads help keep <strong>The Health.Wiki Apps</strong> free and growing.<br><br>
      Please disable your ad blocker — the page will reload automatically. 💚<br><br>
      <strong>Bahasa Indonesia:</strong><br>
      Kami mendeteksi penggunaan <strong>pemblokir iklan</strong>.<br>
      Iklan membantu kami menjaga situs ini tetap gratis & terus berkembang.<br><br>
      Mohon nonaktifkan ad-blocker Anda — halaman akan memuat ulang otomatis. 🙏
    </p>
    <button onclick='location.reload()'>Saya sudah matikan / I’ve turned it off</button>
    <div id='thw-logo'>
      <img src='https://www.health.web.id/favicon.ico' alt='The Health.Wiki Logo'/>
      <span>TheHealth.Wiki Apps</span>
    </div>
  </div>
  `;
  document.body.appendChild(div);

  var bait = document.createElement('div');
  bait.className = 'adsbox';
  bait.style.position = 'absolute';
  bait.style.height = '1px';
  bait.style.width = '1px';
  bait.style.top = '-1000px';
  document.body.appendChild(bait);

  function checkAdblock() {
    if (bait.offsetHeight === 0) {
      document.body.classList.add('thw-halfblur');
      document.getElementById('thw-adblock-msg').style.display = 'block';
    } else {
      document.body.classList.remove('thw-halfblur');
      document.getElementById('thw-adblock-msg').style.display = 'none';
    }
  }

  setTimeout(function(){
    checkAdblock();
    setInterval(function(){
      var msg = document.getElementById('thw-adblock-msg');
      if (msg.style.display === 'block' && bait.offsetHeight !== 0) location.reload();
      checkAdblock();
    }, 3000);
  }, 1500);
})();