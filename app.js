
(async()=>{
const root=document.getElementById('app');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let D;try{D=await fetch('estagios.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error();return r.json()})}catch(e){root.innerHTML='<div class="panel">Não foi possível carregar as informações de estágio.</div>';return}

const list=arr=>`<ul class="list">${arr.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
root.innerHTML=`
<section class="hero"><div class="eyebrow">UFPR · CURSO DE BIOMEDICINA</div><h1>${esc(D.title)}</h1><p>${esc(D.subtitle)}</p></section>
<div class="intro">${esc(D.intro)}</div>

<div class="quick">
 ${D.quick_links.map(x=>`<a href="${esc(x.url||x.target)}" ${x.url?'target="_blank" rel="noopener"':''}>${esc(x.label)}</a>`).join('')}
</div>

${D.important_deadlines?`<section class="section deadline-section">
 <h2>⚠️ ${esc(D.important_deadlines.title)}</h2>
 <div class="deadline-grid">
  ${D.important_deadlines.items.map(x=>`<article class="deadline ${x.priority==='alta'?'high':''}">
    <div class="deadline-date">${esc(x.date)}</div>
    <h3>${esc(x.title)}</h3>
    <p>${esc(x.description)}</p>
  </article>`).join('')}
 </div>
 <div class="deadline-doc">
  <strong>Documento oficial:</strong>
  <a href="${esc(D.semester_orientation.url)}" target="_blank" rel="noopener">${esc(D.semester_orientation.title)}</a>
 </div>
</section>`:''}

<section class="section">
 <h2>Vai iniciar um estágio? Comece por aqui</h2>
 <div class="flow">${D.flow.map(s=>`<article class="step"><div class="num">${esc(s.step)}</div><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></article>`).join('')}</div>
</section>

<section class="section">
 <h2>Responsáveis por modalidade</h2>
 <div class="resp-grid">${D.responsibilities.map(r=>`<article class="card"><span class="badge">${esc(r.area)}</span><h3>${esc(r.responsible)}</h3><p>${esc(r.department)}</p></article>`).join('')}</div>
</section>

<section class="section" id="obrigatorio">
 <h2>${esc(D.mandatory.title)}</h2>
 <div class="panel">
  <div class="hours"><div class="big-number">${D.mandatory.hours} h</div><div>carga horária mínima de estágio obrigatório do Curso de Biomedicina</div>${D.mandatory.official_period?`<div class="period-info"><b>Período regular 2026-2:</b> ${esc(D.mandatory.official_period)}</div>`:''}</div>
  <div>${esc(D.mandatory.description)}</div>
  <h3>Checklist antes de começar</h3>
  <div class="checklist">${D.mandatory.checklist.map(x=>`<div class="check"><span class="box"></span><span>${esc(x)}</span></div>`).join('')}</div>
 </div>
</section>

<section class="section" id="nao-obrigatorio">
 <h2>${esc(D.non_mandatory.title)}</h2>
 <div class="panel"><p>${esc(D.non_mandatory.description)}</p>${list(D.non_mandatory.notes)}</div>
</section>

<section class="section">
 <h2>Antes, durante e ao final</h2>
 <div class="two-col">
  <article class="card"><h3>${esc(D.before_start.title)}</h3>${list(D.before_start.items)}</article>
  <article class="card"><h3>${esc(D.during.title)}</h3>${list(D.during.items)}</article>
 </div>
</section>

<section class="section">
 <h2>${esc(D.finalization.title)}</h2>
 <div class="two-col">
  <article class="card"><h3>Documentos do estudante</h3>${list(D.finalization.student)}</article>
  <article class="card"><h3>Documentos do supervisor</h3>${list(D.finalization.supervisor)}</article>
 </div>
 <div class="panel" style="margin-top:12px">${esc(D.finalization.submission)}</div>
</section>

<section class="section" id="documentos">
 <h2>Documentos e formulários</h2>
 <div class="docs">${D.documents.map(d=>`<article class="doc"><span class="badge">${esc(d.category)}</span><h3>${esc(d.name)}</h3><p>${esc(d.description)}</p><div class="actions"><a href="${esc(d.url)}" target="_blank" rel="noopener">Acessar</a></div></article>`).join('')}</div>
</section>

<section class="section">
 <h2>Legislação</h2>
 <div class="laws">${D.legislation.map(d=>`<article class="law"><h3>${esc(d.name)}</h3><p>${esc(d.description)}</p><div class="actions"><a href="${esc(d.url)}" target="_blank" rel="noopener">Consultar</a></div></article>`).join('')}</div>
</section>

<section class="section">
 <h2>COAPPE, COE e apoio institucional</h2>
 <div class="links">${D.institutional_links.map(d=>`<article class="doc"><h3>${esc(d.name)}</h3><p>${esc(d.description)}</p><div class="actions"><a href="${esc(d.url)}" target="_blank" rel="noopener">Acessar</a></div></article>`).join('')}</div>
</section>

${D.semester_orientation.active?`<section class="section"><h2>Orientação do semestre</h2><div class="panel"><span class="badge">${esc(D.semester_orientation.semester)}</span><h3>${esc(D.semester_orientation.title)}</h3>${D.semester_orientation.url?`<div class="actions"><a href="${esc(D.semester_orientation.url)}" target="_blank" rel="noopener">Abrir orientações</a></div>`:`<div class="warning">${esc(D.semester_orientation.note)}</div>`}</div></section>`:''}

<section class="section">
 <h2>Contato</h2>
 <div class="panel"><div class="contact"><a href="mailto:${esc(D.contact.course_email)}">Coordenação: ${esc(D.contact.course_email)}</a><span>${esc(D.contact.course_phone)}</span><a href="mailto:${esc(D.contact.internship_unit_email)}">UE/COAPPE: ${esc(D.contact.internship_unit_email)}</a><span>${esc(D.contact.internship_unit_phone)}</span></div></div>
</section>`;
})();
