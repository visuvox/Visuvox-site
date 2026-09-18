// COUNTDOWN to August 17, 2027
function tick(){
  const t=new Date('2027-08-17T00:00:00')-new Date();
  const pad=n=>String(Math.max(0,n)).padStart(2,'0');
  document.getElementById('cd-d').textContent=pad(Math.floor(t/864e5));
  document.getElementById('cd-h').textContent=pad(Math.floor(t%864e5/36e5));
  document.getElementById('cd-m').textContent=pad(Math.floor(t%36e5/6e4));
  document.getElementById('cd-s').textContent=pad(Math.floor(t%6e4/1e3));
}
tick();setInterval(tick,1000);

// REVEAL
const obs=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('on');});},{threshold:0.1});
document.querySelectorAll('.rv').forEach(el=>obs.observe(el));

// HEADER SHRINK
window.addEventListener('scroll',()=>{
  document.getElementById('hdr').style.padding=window.scrollY>50?'10px 48px':'16px 48px';
});

// MOBILE MENU
function toggleMobileMenu(){
  document.getElementById('mobileMenuBtn').classList.toggle('open');
  document.getElementById('mobileNav').classList.toggle('open');
  document.body.style.overflow=document.getElementById('mobileNav').classList.contains('open')?'hidden':'';
}
function closeMobileMenu(){
  document.getElementById('mobileMenuBtn').classList.remove('open');
  document.getElementById('mobileNav').classList.remove('open');
  document.body.style.overflow='';
}
function toggleMnGroup(head){
  head.parentElement.classList.toggle('open');
}

// EDIT MODE
const ADMIN_KEY='visuvox2024';
const ADMIN_PASS='VisuVox#2027';

function checkAdminAccess(){
  const params=new URLSearchParams(window.location.search);
  if(params.get('admin')===ADMIN_KEY){
    document.getElementById('editBtn').style.display='flex';
  }
}
checkAdminAccess();

function toggleEdit(){
  const isActive=document.body.classList.contains('edit-mode');
  if(!isActive){
    const pass=prompt('Mot de passe administrateur :');
    if(pass!==ADMIN_PASS){
      if(pass!==null)alert('Mot de passe incorrect.');
      return;
    }
  }
  document.body.classList.toggle('edit-mode');
  const bar=document.getElementById('editBar');
  const btn=document.getElementById('editBtn');
  const nowActive=document.body.classList.contains('edit-mode');
  setTextEditable(nowActive);
  if(nowActive){
    bar.classList.add('active');
    btn.textContent='✅';
    btn.title='Fermer Edition';
  } else {
    bar.classList.remove('active');
    btn.textContent='✏';
    btn.title='Mode Edition';
  }
}

// TEXT EDITING
const EDITABLE_SELECTOR='h1, h2, .lede, .eye, .hero-eyebrow, .hero-sub, .ca-nom, .ca-poste, .ca-bio, .stat .n, .stat .l, .amt, .fb p';
function setTextEditable(state){
  document.querySelectorAll(EDITABLE_SELECTOR).forEach(el=>{
    el.setAttribute('contenteditable', state?'true':'false');
  });
}

// IMAGE HANDLER
function handleImg(input,dzId,imgId){
  const file=input.files[0];
  if(!file)return;
  const reader=new FileReader();
  reader.onload=e=>{
    const img=document.getElementById(imgId);
    const dz=document.getElementById(dzId);
    img.src=e.target.result;
    img.style.display='block';
    dz.classList.add('has-img');
  };
  reader.readAsDataURL(file);
}

// EXPORT — download the site with current images baked in
function exportSite(){
  const clone=document.documentElement.cloneNode(true);
  clone.querySelector('body').classList.remove('edit-mode');
  const editBarClone=clone.querySelector('#editBar');
  if(editBarClone)editBarClone.classList.remove('active');
  clone.querySelectorAll('[contenteditable]').forEach(el=>el.removeAttribute('contenteditable'));
  const html='<!DOCTYPE html>\n'+clone.outerHTML;
  const blob=new Blob([html],{type:'text/html'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;
  a.download='visuvox-site.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  alert('Fichier téléchargé ! Ce fichier contient toutes vos images. Publiez-le pour remplacer votre site en ligne.');
}

// LOGO UPLOAD
function handleLogo(input){
  const file=input.files[0];
  if(!file)return;
  const reader=new FileReader();
  reader.onload=e=>{
    const img=document.getElementById('logo-img');
    img.src=e.target.result;
    img.style.display='inline-block';
  };
  reader.readAsDataURL(file);
}

// GOOGLE FORM
function saveGform(){
  const url=document.getElementById('gform-url').value.trim();
  if(url){
    document.getElementById('gform-link').href=url;
    document.getElementById('gform-link').onclick=null;
    alert('Lien Google Form enregistré.');
  }
}
function openGform(e){
  e.preventDefault();
  alert('Configurez le lien Google Form en Mode Edition (bouton ✏ en bas à droite).');
}

// FORM SUBMIT — send via mailto
function submitForm(e){
  e.preventDefault();
  const nom=document.getElementById('f-nom').value;
  const age=document.getElementById('f-age').value;
  const com=document.getElementById('f-com').value;
  const prog=document.getElementById('f-prog').value;
  const mot=document.getElementById('f-mot').value;
  const tel=document.getElementById('f-tel').value;
  const body=`Candidature VisuVox Academy\n\nNom: ${nom}\nAge: ${age}\nCommune: ${com}\nProgramme: ${prog}\nContact: ${tel}\n\nMotivation:\n${mot}`;
  window.location.href=`mailto:visuvoxhub@gmail.com?subject=Candidature VisuVox - ${nom}&body=${encodeURIComponent(body)}`;
  document.getElementById('form-msg').style.display='block';
}

// REACTION SUBMIT
function submitReaction(e){
  e.preventDefault();
  const msg=document.getElementById('r-msg').value;
  const nom=document.getElementById('r-nom').value||'Anonyme';
  const contact=document.getElementById('r-contact').value;
  const body=`Réaction / Suggestion VisuVox\n\nDe: ${nom}\nContact: ${contact}\n\nMessage:\n${msg}`;
  window.location.href=`mailto:visuvoxhub@gmail.com?subject=Réaction VisuVox - ${nom}&body=${encodeURIComponent(body)}`;
  document.getElementById('react-msg').style.display='block';
}
