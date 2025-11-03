(function(){
  const QUIZ = [
    {id:1,type:"quiz",title:"치약을 바르면 여드름이 하루 만에 없어진다?",article:"최근 SNS에서는 ‘치약을 여드름 부위에 바르면 하루 만에 사라진다’는 영상이 화제다.\n많은 학생들이 직접 따라 하며 효과를 봤다는 댓글을 남기고 있다.\n한 네티즌은 “약국에서 약을 살 필요가 없다”고 말했다.\n피부과 전문의들은 이에 대해 아무런 언급을 하지 않았다.",options:["근거가 전문가가 아닌 ‘댓글’에 의존하고 있다.","치약의 성분이 약보다 안전하다.","SNS에서 유행하면 과학적으로 증명된 것이다.","전문의가 언급하지 않았으니 사실이다."],answer:0,explain:"출처가 ‘SNS 댓글’뿐이며, 과학적 근거·전문가 의견이 없습니다."},
    {id:2,type:"quiz",title:"물만 마시면 일주일 만에 5kg 감량 성공!",article:"한 온라인 카페 사용자가 “물만 마시고 일주일 만에 5kg이 빠졌다”고 글을 올렸다.\n의학 전문가 A씨는 “몸이 가벼워지고 건강해진다”고 조언했다.\n하지만 기사에는 해당 전문가의 소속 기관이 적혀 있지 않았다.",options:["체중이 줄면 모두 건강해지는 것은 아니다.","전문가의 실명·소속이 밝히지 않았다.","글이 인터넷에 올라왔으니 사실이다.","물만 마시는 건 누구에게나 안전하다."],answer:1,explain:"익명 전문가 인용, 소속 불명확 → 신뢰도 낮음."},
    {id:3,type:"quiz",title:"새 스마트폰, 뇌파 조절로 공부 집중력 향상!",article:"한 전자제품 업체는 신제품이 “뇌파를 안정시켜 집중력을 높인다”고 발표했다.\n기사에는 제품의 구조나 연구 결과에 대한 내용은 없으며,\n판매 사이트 링크만 함께 실려 있었다.",options:["판매 링크가 함께 실려 있어 광고일 가능성이 있다.","기술이 신기하므로 사실이다.","회사가 발표했으니 무조건 맞다.","공부와 뇌파는 관계가 없다."],answer:0,explain:"과학적 근거 없이 ‘광고성 기사(광고 뉴스)’의 특징을 가집니다."},
    {id:4,type:"quiz",title:"이번 여름, 60도 폭염 온다!",article:"한 온라인 커뮤니티에 올라온 글에 따르면,\n“올해 여름은 60도까지 오를 예정이며, 정부가 외출 금지령을 준비 중이다”라고 한다.\n하지만 기사에는 기상청 자료나 공식 발표는 포함되어 있지 않다.",options:["기상청 발표가 인용되지 않았다.","날씨가 덥다는 건 사실이다.","온라인 커뮤니티에서 봤으니 진짜다.","정부가 외출 금지령을 내릴 수도 있다."],answer:0,explain:"출처 불분명 + 과장된 숫자 → 전형적인 가짜뉴스 형태입니다."},
    {id:5,type:"quiz",title:"국내 초등학생이 만든 로봇, 사람의 마음 읽어 화제!",article:"한 초등학생이 만든 로봇이 사람의 마음을 읽고 감정을 구분한다고 한다.\n이 로봇은 ‘기분이 좋을 때는 파란 불빛, 나쁠 때는 빨간 불빛’을 낸다고 한다.\n하지만 로봇이 ‘마음을 읽는 방식’에 대한 설명은 전혀 없다.",options:["감정을 읽는 근거가 구체적으로 제시되지 않았다.","초등학생이 만들었으니 신기하다.","색깔이 변하니까 진짜 마음을 읽는 것이다.","불빛이 변하는 건 사실이다."],answer:0,explain:"‘마음 읽기’라는 표현이 과장·오해 유발, 기술 설명이 없습니다."}
  ];
  const PREFS = [
    {id:6,type:"pref",a:"보기 좋은 디자인과 제목을 먼저 고민한다.",b:"정보의 사실 여부와 근거를 먼저 확인한다."},
    {id:7,type:"pref",a:"영상·포스터에서 화면 구성과 색감을 주로 맡는다.",b:"대본·자료 조사·구성 정리를 맡는다."},
    {id:8,type:"pref",a:"SNS 게시물에서 이미지/색감이 먼저 보인다.",b:"글 내용/출처를 먼저 본다."},
    {id:9,type:"pref",a:"기사를 읽을 때 형식(제목, 폰트)에 더 눈이 간다.",b:"정보가 정확한지부터 본다."},
    {id:10,type:"pref",a:"피드백할 때 보기 좋게 바꾸는 방법을 말한다.",b:"사실 확인이 필요한 부분을 짚는다."}
  ];
  const ALL=[...QUIZ,...PREFS];

  const KEY="media-integrated-v4-2"; let answers={};
  try{answers=JSON.parse(localStorage.getItem(KEY))||{}}catch(e){answers={}};
  function save(){ try{ localStorage.setItem(KEY, JSON.stringify(answers)); }catch(e){} }

  function el(tag, attrs={}, children=[]){
    const x=document.createElement(tag);
    for(const[k,v] of Object.entries(attrs)){
      if(k==="class"){ x.className=v; }
      else if(k==="html"){ x.innerHTML=v; }
      else if(k.startsWith("on") && typeof v==="function"){ x.addEventListener(k.substring(2), v); }
      else { x.setAttribute(k, v); }
    }
    (Array.isArray(children)?children:[children]).forEach(c=>{ if(c!=null) x.appendChild(typeof c==="string"?document.createTextNode(c):c); });
    return x;
  }

  function renderProgress(){
    const answered=Object.keys(answers).length;
    const pct=Math.round(answered/ALL.length*100);
    document.getElementById("progLabel").textContent=pct+"%";
    document.getElementById("countLabel").textContent=answered;
    document.getElementById("progBar").style.width=pct+"%";
  }

  function levelFromScore(r){
    if(r>=90) return {name:"우수 수준", color:"var(--good)", tip:"훌륭해요! 친구들과 팩트체크 방법을 나눠 보세요."};
    if(r>=70) return {name:"표준 수준", color:"var(--brand1)", tip:"좋아요. 출처 확인 습관을 꾸준히 유지하세요."};
    if(r>=40) return {name:"기본 수준", color:"var(--warn)", tip:"조금만 더! 기사 출처·전문가 인용을 먼저 보세요."};
    return {name:"기초 형성 단계", color:"var(--bad)", tip:"지금부터가 시작! 제목보다 본문과 근거를 확인하는 습관을 길러요."};
  }

  function roleFromPref(aCnt,bCnt){
    if(aCnt>bCnt) return {key:"aesthetic", name:"🎨 심미형", role:"캔바 디자이너", tip:"색·배치·타이포로 메시지를 또렷하게!"};
    if(bCnt>aCnt) return {key:"analytic", name:"🧠 분석형", role:"팩트체커", tip:"출처·근거·수치 검증 책임!"};
    return {key:"balanced", name:"🔍 균형형", role:"팀 리더/기획자", tip:"디자인과 검증 연결·조정!"};
  }

  function mountQuiz(){
    const m=document.getElementById("qMount"); m.innerHTML="";
    const grid=el("div",{class:"grid"}); m.appendChild(grid);
    QUIZ.forEach(q=>{
      const card=el("article",{class:"card qwrap"});
      const head=el("div",{class:"qtitle"},[ el("div",{},`${q.id}. ${q.title}`), el("span",{class:"pill"},"이상한 점 찾기") ]);
      const art=el("div",{class:"article"},q.article);
      const opts=el("div",{class:"qgrid"});
      q.options.forEach((opt,idx)=>{
        const lab=el("label",{class:"opt"+(answers[q.id]===idx?" active":"")});
        const input=el("input",{type:"radio",name:`q${q.id}`,value:String(idx)});
        input.checked=answers[q.id]===idx;
        input.addEventListener("change",()=>{answers[q.id]=idx;save();renderProgress();mountQuiz();});
        lab.appendChild(input); lab.appendChild(el("span",{},opt));
        opts.appendChild(lab);
      });
      card.appendChild(head); card.appendChild(art); card.appendChild(opts); grid.appendChild(card);
    });
  }

  function mountPref(){
    const m=document.getElementById("prefMount"); m.innerHTML="";
    const grid=el("div",{class:"grid"}); m.appendChild(grid);
    PREFS.forEach(p=>{
      const card=el("article",{class:"card qwrap"});
      const head=el("div",{class:"qtitle"},[ el("div",{},`${p.id}. 어떤 쪽이 더 나와 가까울까?`) ]);
      const opts=el("div",{class:"qgrid"});
      [["A",p.a,"a"],["B",p.b,"b"]].forEach(([labTxt,txt,val])=>{
        const lab=el("label",{class:"opt"+(answers[p.id]===val?" active":"")});
        const input=el("input",{type:"radio",name:`p${p.id}`,value:val});
        input.checked=answers[p.id]===val;
        input.addEventListener("change",()=>{answers[p.id]=val;save();renderProgress();mountPref();});
        lab.appendChild(input); lab.appendChild(el("span",{},`${labTxt}. ${txt}`));
        opts.appendChild(lab);
      });
      card.appendChild(head); card.appendChild(opts); grid.appendChild(card);
    });
  }

  function renderSummary(submit=false){
    const slot=document.getElementById("summarySlot"); slot.innerHTML="";
    if(!submit){
      slot.textContent="제출 후 점수·역량 수준·성향·모둠 역할 제안이 나타납니다.";
      document.getElementById("printBtn").disabled = true;
      return;
    }
    let correct=0; QUIZ.forEach(q=>{ if(answers[q.id]===q.answer) correct++; });
    const totalQ=QUIZ.length; const ratio=Math.round(correct/totalQ*100);
    const lvl=levelFromScore(ratio);
    const badgeA=el("span",{class:"badge",style:`border-color:${lvl.color}; color:${lvl.color}`},`리터러시: ${correct}/${totalQ} · ${ratio}% · ${lvl.name}`);
    const tipA=el("p",{class:"muted mt-8"},`조언: ${lvl.tip}`);

    let aCnt=0,bCnt=0; PREFS.forEach(p=>{ if(answers[p.id]==="a") aCnt++; else if(answers[p.id]==="b") bCnt++; });
    const role=roleFromPref(aCnt,bCnt);
    const badgeB=el("span",{class:"badge",style:"border-color:#64748b; color:#334155; margin-left:6px"},`성향: ${role.name} · A:${aCnt} / B:${bCnt}`);
    const tipB=el("p",{class:"muted mt-8"},`추천 역할: ${role.role} — ${role.tip}`);
    const teaming=el("p",{class:"muted mt-12"},"모둠 구성 팁: 🎨 심미형 + 🧠 분석형 + 🔍 균형형이 섞이면 가장 좋아요.");

    slot.appendChild(badgeA); slot.appendChild(badgeB); slot.appendChild(tipA); slot.appendChild(tipB); slot.appendChild(teaming);
    document.getElementById("printBtn").disabled = false;
  }

  function mountExplain(submit=false){
    const m=document.getElementById("explainMount"); m.innerHTML=""; if(!submit) return;
    const wrap=el("section",{class:"grid"});
    QUIZ.forEach(q=>{
      const ok=answers[q.id]===q.answer; const color=ok?"var(--good)":"var(--bad)";
      const card=el("article",{class:"card qwrap"});
      const head=el("div",{class:"qtitle"},[ el("div",{},`A-${q.id}. 정답 ${q.answer+1}번`), el("span",{class:"pill",style:`color:${color}; border-color:${color}`}, ok?"정답":"오답") ]);
      const body=el("p",{class:"muted"}, q.explain);
      card.appendChild(head); card.appendChild(body); wrap.appendChild(card);
    });
    m.appendChild(wrap);
  }

  function mountWrongNote(submit=false){
    const m=document.getElementById("wrongNoteMount"); m.innerHTML=""; if(!submit) return;
    const wrongs=QUIZ.filter(q=>answers[q.id]!==q.answer);
    const card=el("article",{class:"card qwrap"});
    const head=el("h3",{class:"h5"},"오답노트");
    const help=el("p",{class:"muted mt-8"},"‘왜 헷갈렸는지’와 ‘다음에 어떻게 확인할지’를 한 줄씩 적어 보세요.");
    const ta=el("textarea",{class:"ta",placeholder:"예) 4번: 숫자가 커서 진짜 같았음 → 다음에는 기상청/정부 발표 확인"});
    card.appendChild(head);
    if(wrongs.length===0){
      card.appendChild(el("p",{class:"muted mt-8"},"A 영역 모든 문항 정답! 훌륭해요."));
    }else{
      const list=el("ul",{});
      wrongs.forEach(w=>{ list.appendChild(el("li",{},`문항 ${w.id}: 정답 ${w.answer+1}번 · 해설: ${w.explain}`)); });
      card.appendChild(list); card.appendChild(help); card.appendChild(ta);
    }
    m.appendChild(card);
  }

  document.getElementById("printBtn").addEventListener("click",()=>window.print());
  document.getElementById("resetBtn").addEventListener("click",()=>{
    if(confirm("모든 응답을 초기화하고 처음부터 다시 풀까요?")){
      answers={}; save(); renderProgress(); renderSummary(false); mountQuiz(); mountPref();
      document.getElementById("explainMount").innerHTML=""; document.getElementById("wrongNoteMount").innerHTML="";
      window.scrollTo({top:0,behavior:"smooth"});
    }
  });
  document.getElementById("submitBtn").addEventListener("click",()=>{
    const first=ALL.find(q=>answers[q.id]===undefined);
    if(first){ document.getElementById("submitHint").textContent="미응답 문항부터 선택해 주세요."; setTimeout(()=>document.getElementById("submitHint").textContent="",3500); return; }
    renderSummary(true); mountExplain(true); mountWrongNote(true); window.scrollTo({top:0,behavior:"smooth"});
  });

  renderProgress(); renderSummary(false); mountQuiz(); mountPref();
})();