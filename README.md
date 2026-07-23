[index.html](https://github.com/user-attachments/files/30297004/index.html)
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>가계부</title>
<style>
  :root{
    --bg:#F5F6F8;
    --card:#FFFFFF;
    --line:#E5E7EB;
    --ink:#1F2430;
    --sub:#6B7280;
    --accent:#0F766E;
    --accent-soft:#CCFBF1;
    --up:#DC2626;
    --up-soft:#FEE2E2;
    --down:#0E9F6E;
    --down-soft:#DCFCE7;
    --fixed:#B45309;
    --fixed-soft:#FEF3C7;
    --variable:#2563EB;
    --variable-soft:#DBEAFE;
    --radius:12px;
  }
  *{box-sizing:border-box;}
  body{
    margin:0;
    font-family:-apple-system,BlinkMacSystemFont,"Apple SD Gothic Neo","Noto Sans KR","Malgun Gothic",sans-serif;
    background:var(--bg);
    color:var(--ink);
    line-height:1.5;
  }
  header{
    background:var(--card);
    border-bottom:1px solid var(--line);
    position:sticky; top:0; z-index:50;
  }
  .header-inner{
    max-width:1100px; margin:0 auto; padding:14px 20px;
    display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap;
  }
  .brand{font-size:18px; font-weight:800; letter-spacing:-0.02em; display:flex; align-items:center; gap:8px;}
  .brand-dot{width:8px;height:8px;border-radius:50%;background:var(--accent);}
  nav{display:flex; gap:4px; flex-wrap:wrap;}
  nav button{
    border:none; background:transparent; padding:8px 14px; border-radius:999px;
    font-size:14px; font-weight:600; color:var(--sub); cursor:pointer; transition:.15s;
  }
  nav button:hover{background:var(--bg); color:var(--ink);}
  nav button.active{background:var(--ink); color:#fff;}
  main{max-width:1100px; margin:0 auto; padding:24px 20px 80px;}
  .view{display:none;}
  .view.active{display:block; animation:fadein .2s ease;}
  @keyframes fadein{from{opacity:0; transform:translateY(4px);} to{opacity:1; transform:translateY(0);}}

  .grid{display:grid; gap:16px;}
  .grid-4{grid-template-columns:repeat(4,1fr);}
  .grid-2{grid-template-columns:1fr 1fr;}
  @media(max-width:820px){.grid-4{grid-template-columns:1fr 1fr;} .grid-2{grid-template-columns:1fr;}}
  @media(max-width:560px){.grid-4{grid-template-columns:1fr;}}

  .card{
    background:var(--card); border:1px solid var(--line); border-radius:var(--radius);
    padding:18px 20px;
  }
  .kpi-label{font-size:13px; color:var(--sub); font-weight:600; margin-bottom:6px;}
  .kpi-value{font-size:24px; font-weight:800; letter-spacing:-0.02em;}
  .kpi-sub{font-size:12px; color:var(--sub); margin-top:4px;}
  .section-title{font-size:15px; font-weight:800; margin:28px 0 12px; display:flex; align-items:center; justify-content:space-between;}
  .section-title .hint{font-size:12px; color:var(--sub); font-weight:500;}

  table{width:100%; border-collapse:collapse; font-size:13.5px;}
  th{text-align:left; color:var(--sub); font-weight:600; padding:8px 10px; border-bottom:1px solid var(--line); white-space:nowrap;}
  td{padding:9px 10px; border-bottom:1px solid var(--line); vertical-align:middle;}
  tr:last-child td{border-bottom:none;}
  .tbl-wrap{overflow-x:auto;}

  .btn{
    border:none; background:var(--ink); color:#fff; padding:9px 16px; border-radius:8px;
    font-size:13.5px; font-weight:700; cursor:pointer;
  }
  .btn.secondary{background:var(--bg); color:var(--ink); border:1px solid var(--line);}
  .btn.ghost{background:transparent; color:var(--sub); border:1px solid var(--line);}
  .btn.danger{background:#fff; color:var(--up); border:1px solid var(--up-soft);}
  .btn:hover{opacity:.88;}
  .btn-row{display:flex; gap:8px; flex-wrap:wrap;}

  .tag{display:inline-block; font-size:11px; font-weight:700; padding:2px 8px; border-radius:999px;}
  .tag.fixed{background:var(--fixed-soft); color:var(--fixed);}
  .tag.variable{background:var(--variable-soft); color:var(--variable);}
  .tag.up{background:var(--up-soft); color:var(--up);}
  .tag.down{background:var(--down-soft); color:var(--down);}
  .tag.oneoff{background:#F3F4F6; color:var(--sub);}

  .pill-actions{display:flex; gap:6px;}
  .icon-btn{
    border:none; background:transparent; color:var(--sub); cursor:pointer; font-size:13px;
    padding:4px 8px; border-radius:6px;
  }
  .icon-btn:hover{background:var(--bg); color:var(--ink);}

  .progress-bg{width:100%; height:8px; border-radius:999px; background:var(--bg); overflow:hidden;}
  .progress-fill{height:100%; border-radius:999px; background:var(--accent);}
  .progress-fill.over{background:var(--up);}

  .spark{display:block;}

  /* Modal */
  .overlay{
    display:none; position:fixed; inset:0; background:rgba(15,23,20,.45);
    align-items:center; justify-content:center; z-index:100; padding:20px;
  }
  .overlay.active{display:flex;}
  .modal{
    background:#fff; border-radius:16px; padding:24px; width:100%; max-width:480px;
    max-height:88vh; overflow-y:auto;
  }
  .modal h3{margin:0 0 16px; font-size:16px; font-weight:800;}
  .field{margin-bottom:12px;}
  .field label{display:block; font-size:12.5px; font-weight:700; color:var(--sub); margin-bottom:5px;}
  .field input, .field select, .field textarea{
    width:100%; padding:9px 10px; border:1px solid var(--line); border-radius:8px;
    font-size:14px; font-family:inherit; background:#fff; color:var(--ink);
  }
  .field-row{display:grid; grid-template-columns:1fr 1fr; gap:10px;}
  .checkbox-row{display:flex; align-items:center; gap:8px; margin-bottom:12px;}
  .checkbox-row input{width:auto;}
  .checkbox-row label{font-size:13.5px; font-weight:600; color:var(--ink); margin:0;}

  .empty{color:var(--sub); font-size:13.5px; padding:20px 0; text-align:center;}
  .muted{color:var(--sub);}
  .right{text-align:right;}
  .num{font-variant-numeric:tabular-nums;}

  .rank-box{display:grid; grid-template-columns:1fr 1fr; gap:16px;}
  @media(max-width:820px){.rank-box{grid-template-columns:1fr;}}
  .rank-item{display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid var(--line); font-size:13.5px;}
  .rank-item:last-child{border-bottom:none;}

  footer{text-align:center; color:var(--sub); font-size:12px; padding:30px 20px;}
  .file-input-label{display:inline-block; cursor:pointer;}
</style>
<script src="https://accounts.google.com/gsi/client" async defer></script>
</head>
<body>

<header>
  <div class="header-inner">
    <div class="brand"><span class="brand-dot"></span>가계부</div>
    <nav id="tabNav">
      <button data-tab="dashboard" class="active">대시보드</button>
      <button data-tab="income">수입</button>
      <button data-tab="transactions">지출 입력</button>
      <button data-tab="categories">카테고리 관리</button>
      <button data-tab="trends">증감 추이</button>
      <button data-tab="savings">저축/대출</button>
      <button data-tab="investments">투자</button>
      <button data-tab="portfolio">포트폴리오</button>
      <button data-tab="backup">백업/복원</button>
    </nav>
  </div>
</header>

<main>

  <!-- ===== DASHBOARD ===== -->
  <section id="view-dashboard" class="view active">
    <div class="section-title">
      <span id="dashMonthLabel">이번 달 요약</span>
      <div class="btn-row">
        <select id="dashMonthSelect" onchange="onDashMonthChange()" style="height:38px; border-radius:8px; border:1px solid var(--line); padding:0 10px;"></select>
      </div>
    </div>
    <div class="grid grid-4">
      <div class="card">
        <div class="kpi-label">지출 (사용일 기준)</div>
        <div class="kpi-value num" id="kpiThisMonth">0원</div>
        <div class="kpi-sub" id="kpiThisMonthSub">-</div>
      </div>
      <div class="card">
        <div class="kpi-label">다음 달 예상 결제액 (결제일 기준)</div>
        <div class="kpi-value num" id="kpiNextPay">0원</div>
        <div class="kpi-sub">카드값 + 고정비 예정</div>
      </div>
      <div class="card">
        <div class="kpi-label">고정비 합계</div>
        <div class="kpi-value num" id="kpiFixed">0원</div>
        <div class="kpi-sub" id="kpiFixedRatio">총지출 대비 -%</div>
      </div>
      <div class="card">
        <div class="kpi-label">변동비 합계</div>
        <div class="kpi-value num" id="kpiVariable">0원</div>
        <div class="kpi-sub" id="kpiVariableRatio">총지출 대비 -%</div>
      </div>
    </div>

    <div class="section-title">수입 대비 지출·저축·투자<span class="hint">선택한 달 기준</span></div>
    <div class="grid grid-4">
      <div class="card">
        <div class="kpi-label">수입</div>
        <div class="kpi-value num" id="kpiIncome">0원</div>
        <div class="kpi-sub"><a href="#" onclick="switchTab('income');return false;">수입 관리 →</a></div>
      </div>
      <div class="card">
        <div class="kpi-label">저축</div>
        <div class="kpi-value num" id="kpiSavingFlow">0원</div>
        <div class="kpi-sub" id="kpiSavingFlowRatio">수입 대비 -%</div>
      </div>
      <div class="card">
        <div class="kpi-label">투자</div>
        <div class="kpi-value num" id="kpiInvestFlow">0원</div>
        <div class="kpi-sub" id="kpiInvestFlowRatio">수입 대비 -%</div>
      </div>
      <div class="card">
        <div class="kpi-label">남는 돈 (수입 - 지출 - 저축 - 투자)</div>
        <div class="kpi-value num" id="kpiLeftover">0원</div>
        <div class="kpi-sub" id="kpiLeftoverRatio">수입 대비 -%</div>
      </div>
    </div>
    <div class="card">
      <div id="incomeBreakdownBar"></div>
    </div>

    <div class="section-title">
      저축/투자 입금 기록<span class="hint">적금 자동이체 외 목돈 이체·주식 매수 등</span>
      <button class="btn secondary" onclick="openTransferModal()">+ 입금 기록 추가</button>
    </div>
    <div class="card">
      <div class="tbl-wrap">
        <table>
          <thead><tr><th>날짜</th><th>구분</th><th class="right">금액</th><th>메모</th><th></th></tr></thead>
          <tbody id="transferTableBody"></tbody>
        </table>
      </div>
      <div id="transferEmpty" class="empty" style="display:none;">선택한 달에 기록된 저축/투자 입금이 없습니다.</div>
    </div>

    <div class="section-title">월별 비교 (최근 6개월)</div>
    <div class="card">
      <div class="tbl-wrap">
        <table>
          <thead><tr><th>월</th><th class="right">수입</th><th class="right">지출</th><th class="right">저축</th><th class="right">투자</th><th class="right">남는 돈</th><th class="right">저축률</th></tr></thead>
          <tbody id="monthCompareTableBody"></tbody>
        </table>
      </div>
    </div>

    <div class="section-title">자산 현황<span class="hint">저축·투자·현금 - 대출</span></div>
    <div class="grid grid-4">
      <div class="card">
        <div class="kpi-label">총자산</div>
        <div class="kpi-value num" id="kpiTotalAsset">0원</div>
        <div class="kpi-sub">현금 + 저축 + 투자평가액</div>
      </div>
      <div class="card">
        <div class="kpi-label">총부채</div>
        <div class="kpi-value num" id="kpiTotalDebt">0원</div>
        <div class="kpi-sub">대출 잔액 합계</div>
      </div>
      <div class="card">
        <div class="kpi-label">순자산</div>
        <div class="kpi-value num" id="kpiNetWorth">0원</div>
        <div class="kpi-sub">총자산 - 총부채</div>
      </div>
      <div class="card">
        <div class="kpi-label">순저축</div>
        <div class="kpi-value num" id="kpiNetSavings">0원</div>
        <div class="kpi-sub">저축 잔액 - 대출 잔액</div>
      </div>
    </div>

    <div class="section-title">카테고리별 지출 비중 (선택한 달, 사용일 기준)</div>
    <div class="card">
      <div id="categoryBreakdown"></div>
    </div>

    <div class="section-title">예산 대비 실적<span class="hint">카테고리 관리에서 월예산을 설정하면 표시됩니다</span></div>
    <div class="card">
      <div id="budgetProgress"></div>
    </div>
  </section>

  <!-- ===== INCOME ===== -->
  <section id="view-income" class="view">
    <div class="section-title">
      수입 항목
      <button class="btn" onclick="openIncomeModal()">+ 수입 추가</button>
    </div>
    <div class="card">
      <p class="muted" style="margin-top:0;">월급처럼 매월 반복되는 수입은 "매월 반복"으로, 특정 달에만 들어온 용돈·부수입은 "특정 날짜"로 등록하세요.</p>
      <div class="tbl-wrap">
        <table>
          <thead>
            <tr><th>항목명</th><th>구분</th><th class="right">금액</th><th>반복</th><th>기간</th><th></th><th></th></tr>
          </thead>
          <tbody id="incomeTableBody"></tbody>
        </table>
      </div>
      <div id="incomeEmpty" class="empty" style="display:none;">등록된 수입이 없습니다. "+ 수입 추가"로 시작해보세요.</div>
    </div>
  </section>

  <!-- ===== TRANSACTIONS ===== -->
  <section id="view-transactions" class="view">
    <div class="section-title">
      지출 내역
      <button class="btn" onclick="openTxModal()">+ 지출 추가</button>
    </div>
    <div class="card">
      <div class="tbl-wrap">
        <table>
          <thead>
            <tr>
              <th>사용일</th><th>결제일</th><th>결제수단</th><th>카테고리</th><th>세부내용</th>
              <th class="right">금액</th><th></th><th></th>
            </tr>
          </thead>
          <tbody id="txTableBody"></tbody>
        </table>
      </div>
      <div id="txEmpty" class="empty" style="display:none;">등록된 지출 내역이 없습니다. "+ 지출 추가"로 시작해보세요.</div>
    </div>
  </section>

  <!-- ===== CATEGORIES ===== -->
  <section id="view-categories" class="view">
    <div class="section-title">
      고정비 / 변동비 항목 관리
      <button class="btn" onclick="openCatModal()">+ 항목 추가</button>
    </div>
    <div class="card">
      <div class="tbl-wrap">
        <table>
          <thead>
            <tr><th>대분류</th><th>세부항목</th><th>구분</th><th class="right">월예산</th><th></th><th></th></tr>
          </thead>
          <tbody id="catTableBody"></tbody>
        </table>
      </div>
      <div id="catEmpty" class="empty" style="display:none;">등록된 카테고리가 없습니다.</div>
    </div>
  </section>

  <!-- ===== TRENDS ===== -->
  <section id="view-trends" class="view">
    <div class="section-title">세부항목별 최근 6개월 추이<span class="hint">일회성 지출로 표시된 건은 계산에서 제외됩니다</span></div>
    <div class="card">
      <div class="tbl-wrap">
        <table>
          <thead>
            <tr>
              <th>대분류</th><th>세부항목</th><th>구분</th><th>추이</th>
              <th class="right">이번 달</th><th class="right">전월비</th><th class="right">3개월 평균비</th>
            </tr>
          </thead>
          <tbody id="trendTableBody"></tbody>
        </table>
      </div>
      <div id="trendEmpty" class="empty" style="display:none;">추이를 계산할 데이터가 부족합니다.</div>
    </div>

    <div class="section-title">한눈에 보기</div>
    <div class="rank-box">
      <div class="card">
        <div class="kpi-label" style="margin-bottom:10px;">🔺 절약 후보 (증가 추세 상위)</div>
        <div id="rankUp"></div>
      </div>
      <div class="card">
        <div class="kpi-label" style="margin-bottom:10px;">🔻 증액 여유 (감소·여유 추세 상위)</div>
        <div id="rankDown"></div>
      </div>
    </div>
  </section>

  <!-- ===== SAVINGS / LOANS ===== -->
  <section id="view-savings" class="view">
    <div class="section-title">
      저축 (예금·적금)
      <button class="btn" onclick="openSavingModal()">+ 저축 상품 추가</button>
    </div>
    <div class="card">
      <div class="tbl-wrap">
        <table>
          <thead>
            <tr><th>상품명</th><th>금융기관</th><th>유형</th><th class="right">현재 납입액</th><th class="right">만기 예상 원리금(세후)</th><th>만기일</th><th></th><th></th></tr>
          </thead>
          <tbody id="savingTableBody"></tbody>
        </table>
      </div>
      <div id="savingEmpty" class="empty" style="display:none;">등록된 저축 상품이 없습니다.</div>
    </div>

    <div class="section-title" style="margin-top:30px;">
      대출
      <button class="btn" onclick="openLoanModal()">+ 대출 추가</button>
    </div>
    <div class="card">
      <div class="tbl-wrap">
        <table>
          <thead>
            <tr><th>대출기관</th><th>원금</th><th>이자율</th><th>상환방식</th><th class="right">이번달 상환액(원금/이자)</th><th class="right">대출잔액</th><th>다음 상환일</th><th></th><th></th></tr>
          </thead>
          <tbody id="loanTableBody"></tbody>
        </table>
      </div>
      <div id="loanEmpty" class="empty" style="display:none;">등록된 대출이 없습니다.</div>
    </div>
  </section>

  <!-- ===== INVESTMENTS ===== -->
  <section id="view-investments" class="view">
    <div class="section-title">
      보유 종목
      <div class="btn-row">
        <button class="btn secondary" onclick="syncPricesFromDrive()">📈 최신 시세 반영 (KIS 자동)</button>
        <button class="btn" onclick="openHoldingModal()">+ 종목 추가</button>
      </div>
    </div>
    <p class="kpi-sub" id="priceSyncStatus" style="margin-top:-6px;">종목코드가 입력된 종목만 자동 반영됩니다. Google Drive 로그인 후 사용 가능.</p>
    <div class="card">
      <div class="tbl-wrap">
        <table>
          <thead>
            <tr><th>종목명</th><th>계좌</th><th>자산군</th><th class="right">수량</th><th class="right">평균단가</th><th class="right">현재가</th><th class="right">평가금액</th><th class="right">평가손익</th><th></th><th></th></tr>
          </thead>
          <tbody id="holdingTableBody"></tbody>
        </table>
      </div>
      <div id="holdingEmpty" class="empty" style="display:none;">등록된 보유 종목이 없습니다.</div>
    </div>

    <div class="section-title" style="margin-top:30px;">
      현금성 자산
      <button class="btn" onclick="openCashModal()">+ 현금 자산 추가</button>
    </div>
    <div class="card">
      <div class="tbl-wrap">
        <table>
          <thead><tr><th>이름</th><th class="right">금액</th><th></th><th></th></tr></thead>
          <tbody id="cashTableBody"></tbody>
        </table>
      </div>
      <div id="cashEmpty" class="empty" style="display:none;">등록된 현금성 자산이 없습니다. (통장 잔액, 지갑 현금 등)</div>
    </div>

    <div class="section-title" style="margin-top:30px;">차익실현 알림 기준<span class="hint">개별 종목 수익률이 이 값을 넘으면 알림 표시</span></div>
    <div class="card">
      <div class="field" style="max-width:200px; margin-bottom:0;">
        <label>수익률 임계값 (%)</label>
        <input type="number" id="profitThreshold" onchange="updateProfitThreshold()">
      </div>
    </div>
  </section>

  <!-- ===== PORTFOLIO ===== -->
  <section id="view-portfolio" class="view">
    <div class="section-title">자산군별 포트폴리오<span class="hint">현금 + 저축 + 투자 평가금액 기준</span></div>
    <div class="card">
      <div class="tbl-wrap">
        <table>
          <thead><tr><th>자산군</th><th class="right">현재 금액</th><th class="right">현재 비중</th><th class="right">목표 비중</th><th class="right">허용 밴드</th><th>상태</th></tr></thead>
          <tbody id="allocTableBody"></tbody>
        </table>
      </div>
      <div id="allocEmpty" class="empty" style="display:none;">자산 데이터가 없습니다.</div>
    </div>

    <div class="section-title" style="margin-top:30px;">
      목표 비중 설정
      <button class="btn" onclick="openAllocModal()">+ 자산군 목표 추가</button>
    </div>
    <div class="card">
      <div class="tbl-wrap">
        <table>
          <thead><tr><th>자산군</th><th class="right">목표 비중(%)</th><th class="right">허용 최소(%)</th><th class="right">허용 최대(%)</th><th></th><th></th></tr></thead>
          <tbody id="allocTargetTableBody"></tbody>
        </table>
      </div>
      <div id="allocTargetEmpty" class="empty" style="display:none;">설정된 목표 비중이 없습니다.</div>
    </div>

    <div class="section-title" style="margin-top:30px;">종목별 비중 (전체 자산 대비)</div>
    <div class="card">
      <div id="stockPortfolioBreakdown"></div>
    </div>
  </section>

  <!-- ===== BACKUP ===== -->
  <section id="view-backup" class="view">
    <div class="section-title">Google Drive 동기화<span class="hint">데스크탑·휴대폰 데이터 공유</span></div>
    <div class="card">
      <p class="muted" style="margin-top:0;">Google 계정으로 로그인하면 이 앱이 만든 <code>household_ledger_data.json</code> 파일에만 접근합니다(다른 Drive 파일은 건드리지 않음). 최초 1회 아래 설정이 필요합니다. <a href="#" onclick="toggleDriveHelp();return false;">설정 방법 보기</a></p>
      <div id="driveHelp" style="display:none; background:var(--bg); border-radius:8px; padding:14px 16px; margin-bottom:14px; font-size:13px; line-height:1.7;">
        1. <a href="https://console.cloud.google.com/apis/credentials" target="_blank">Google Cloud Console → 사용자 인증 정보</a>에서 새 프로젝트 생성<br>
        2. "OAuth 동의 화면" 설정 → User Type: 외부 → 게시 상태는 "테스트"로 두고 본인 Gmail을 테스트 사용자로 추가<br>
        3. "API 및 서비스 → 라이브러리"에서 <b>Google Drive API</b> 사용 설정<br>
        4. "사용자 인증 정보 만들기 → OAuth 클라이언트 ID → 웹 애플리케이션" 선택<br>
        5. "승인된 자바스크립트 원본"에 이 파일을 여는 주소를 추가 (예: <code>http://localhost</code>, 또는 GitHub Pages 등에 올린 주소. <code>file://</code>로 직접 여는 방식은 동작하지 않습니다)<br>
        6. 발급된 <b>클라이언트 ID</b>를 아래 입력창에 붙여넣기 (한 번만 하면 이 브라우저에 저장됨)
      </div>
      <div class="field" style="max-width:520px;">
        <label>Google OAuth 클라이언트 ID</label>
        <input type="text" id="gClientId" placeholder="xxxxxxxx.apps.googleusercontent.com" onchange="saveClientId()">
      </div>
      <div class="btn-row">
        <button class="btn" id="gSignInBtn" onclick="driveSignIn()">Google 로그인</button>
        <button class="btn secondary" id="gPullBtn" onclick="driveSyncPull()" disabled>⬇ Drive에서 가져오기</button>
        <button class="btn secondary" id="gPushBtn" onclick="driveSyncPush()" disabled>⬆ Drive로 업로드</button>
      </div>
      <div class="checkbox-row" style="margin-top:14px;">
        <input type="checkbox" id="autoSyncToggle" onchange="toggleAutoSync()">
        <label for="autoSyncToggle">변경 시 자동으로 Drive에 업로드 (다른 기기에서는 들어올 때 "Drive에서 가져오기"로 최신화)</label>
      </div>
      <p class="kpi-sub" id="driveStatus" style="margin-top:12px;">로그인되어 있지 않습니다.</p>
    </div>

    <div class="section-title" style="margin-top:30px;">JSON 백업 / 복원</div>
    <div class="card">
      <p class="muted" style="margin-top:0;">Drive 동기화와 별개로 로컬 파일로도 백업할 수 있습니다.</p>
      <div class="btn-row">
        <button class="btn" onclick="exportJSON()">⬇ JSON 백업 다운로드</button>
        <label class="btn secondary file-input-label">
          ⬆ JSON 불러오기
          <input type="file" accept="application/json" style="display:none;" onchange="importJSON(event)">
        </label>
        <button class="btn danger" onclick="resetAll()">전체 데이터 초기화</button>
      </div>
      <p class="kpi-sub" id="backupInfo" style="margin-top:14px;"></p>
    </div>
  </section>

</main>

<footer>가계부 · 브라우저(localStorage)에 저장되며, Google Drive 로그인 시 기기 간 동기화됩니다 · 주기적으로 JSON 백업을 권장합니다</footer>

<!-- Transaction Modal -->
<!-- Income Modal -->
<div class="overlay" id="incomeOverlay">
  <div class="modal">
    <h3 id="incomeModalTitle">수입 추가</h3>
    <input type="hidden" id="incomeId">
    <div class="field">
      <label>항목명</label>
      <input type="text" id="incomeName" placeholder="예: 월급, 용돈, 부수입">
    </div>
    <div class="field">
      <label>구분</label>
      <select id="incomeCategory">
        <option value="급여">급여</option>
        <option value="용돈">용돈</option>
        <option value="부수입">부수입</option>
        <option value="상여">상여/보너스</option>
        <option value="기타">기타</option>
      </select>
    </div>
    <div class="field">
      <label>금액</label>
      <input type="number" id="incomeAmount" placeholder="0">
    </div>
    <div class="checkbox-row">
      <input type="checkbox" id="incomeRecurring" checked onchange="onIncomeRecurringChange()">
      <label for="incomeRecurring">매월 반복되는 수입입니다 (월급 등)</label>
    </div>
    <div id="incomeRecurringRow" class="field-row">
      <div class="field">
        <label>시작 월</label>
        <input type="month" id="incomeStartMonth">
      </div>
      <div class="field">
        <label>종료 월 (선택, 비워두면 계속)</label>
        <input type="month" id="incomeEndMonth">
      </div>
    </div>
    <div id="incomeOneTimeRow" class="field" style="display:none;">
      <label>받은 날짜</label>
      <input type="date" id="incomeDate">
    </div>
    <div class="btn-row" style="margin-top:16px;">
      <button class="btn" onclick="saveIncome()">저장</button>
      <button class="btn secondary" onclick="closeModal('incomeOverlay')">취소</button>
    </div>
  </div>
</div>

<!-- Transfer (저축/투자 입금) Modal -->
<div class="overlay" id="transferOverlay">
  <div class="modal">
    <h3 id="transferModalTitle">저축/투자 입금 기록</h3>
    <input type="hidden" id="transferId">
    <div class="field">
      <label>날짜</label>
      <input type="date" id="transferDate">
    </div>
    <div class="field">
      <label>구분</label>
      <select id="transferType">
        <option value="saving">저축 (예금/CMA 등 목돈 이체)</option>
        <option value="invest">투자 (주식/펀드 등 매수 입금)</option>
      </select>
    </div>
    <div class="field">
      <label>금액</label>
      <input type="number" id="transferAmount" placeholder="0">
    </div>
    <div class="field">
      <label>메모 (선택)</label>
      <input type="text" id="transferMemo" placeholder="예: 삼성전자 추가매수">
    </div>
    <p class="kpi-sub" style="margin-top:-4px;">참고: 적금(자동이체)은 "저축/대출" 탭에 등록해두면 매월 자동 반영되니 여기 따로 기록할 필요 없습니다. 여긴 예금 목돈 이체나 주식 매수처럼 정기 자동계산이 안 되는 입금만 기록하세요.</p>
    <div class="btn-row" style="margin-top:16px;">
      <button class="btn" onclick="saveTransfer()">저장</button>
      <button class="btn secondary" onclick="closeModal('transferOverlay')">취소</button>
    </div>
  </div>
</div>

<div class="overlay" id="txOverlay">
  <div class="modal">
    <h3 id="txModalTitle">지출 추가</h3>
    <input type="hidden" id="txId">
    <div class="field">
      <label>결제수단</label>
      <select id="txMethod" onchange="onMethodChange()">
        <option value="credit">신용카드</option>
        <option value="check">체크카드</option>
        <option value="cash">현금/계좌이체</option>
      </select>
    </div>
    <div class="field-row">
      <div class="field">
        <label>사용일</label>
        <input type="date" id="txUseDate">
      </div>
      <div class="field">
        <label>결제(출금)예정일</label>
        <input type="date" id="txPayDate">
      </div>
    </div>
    <div class="field-row" id="installmentRow">
      <div class="field">
        <label>카드/계좌명</label>
        <input type="text" id="txCardName" placeholder="예: 신한카드, OO은행">
      </div>
      <div class="field">
        <label>할부 개월 (신용카드만)</label>
        <input type="number" id="txInstallment" min="1" value="1">
      </div>
    </div>
    <div class="field">
      <label>카테고리</label>
      <select id="txCategory"></select>
    </div>
    <div class="field">
      <label>금액</label>
      <input type="number" id="txAmount" placeholder="0">
    </div>
    <div class="field">
      <label>세부내용 / 메모</label>
      <input type="text" id="txMemo" placeholder="예: 이마트 장보기">
    </div>
    <div class="checkbox-row">
      <input type="checkbox" id="txOneOff">
      <label for="txOneOff">일회성 지출입니다 (경조사, 여행 등 — 증감 추이 계산에서 제외)</label>
    </div>
    <div class="btn-row" style="margin-top:16px;">
      <button class="btn" onclick="saveTx()">저장</button>
      <button class="btn secondary" onclick="closeModal('txOverlay')">취소</button>
    </div>
  </div>
</div>

<!-- Category Modal -->
<div class="overlay" id="catOverlay">
  <div class="modal">
    <h3 id="catModalTitle">카테고리 항목 추가</h3>
    <input type="hidden" id="catId">
    <div class="field">
      <label>대분류</label>
      <input type="text" id="catGroup" placeholder="예: 식비, 주거, 구독">
    </div>
    <div class="field">
      <label>세부항목명</label>
      <input type="text" id="catName" placeholder="예: 배달음식, 넷플릭스">
    </div>
    <div class="field-row">
      <div class="field">
        <label>구분</label>
        <select id="catType">
          <option value="variable">변동비</option>
          <option value="fixed">고정비</option>
        </select>
      </div>
      <div class="field">
        <label>월예산 (선택)</label>
        <input type="number" id="catBudget" placeholder="0">
      </div>
    </div>
    <div class="btn-row" style="margin-top:16px;">
      <button class="btn" onclick="saveCat()">저장</button>
      <button class="btn secondary" onclick="closeModal('catOverlay')">취소</button>
    </div>
  </div>
</div>

<!-- Saving Modal -->
<div class="overlay" id="savingOverlay">
  <div class="modal">
    <h3 id="savingModalTitle">저축 상품 추가</h3>
    <input type="hidden" id="savingId">
    <div class="field">
      <label>상품명</label>
      <input type="text" id="savingName" placeholder="예: 청년도약계좌">
    </div>
    <div class="field">
      <label>금융기관</label>
      <input type="text" id="savingInstitution" placeholder="예: 국민은행">
    </div>
    <div class="field">
      <label>유형</label>
      <select id="savingType" onchange="onSavingTypeChange()">
        <option value="installment">적금 (매월 납입)</option>
        <option value="lump">예금/CMA (목돈 예치)</option>
      </select>
    </div>
    <div class="field-row">
      <div class="field" id="savingAmountFieldWrap">
        <label id="savingAmountLabel">월 납입액</label>
        <input type="number" id="savingAmount" placeholder="0">
      </div>
      <div class="field">
        <label>연 이자율 (%)</label>
        <input type="number" step="0.01" id="savingRate" placeholder="0">
      </div>
    </div>
    <div class="field-row">
      <div class="field">
        <label>시작일</label>
        <input type="date" id="savingStartDate">
      </div>
      <div class="field">
        <label>기간(개월)</label>
        <input type="number" id="savingTermMonths" placeholder="12">
      </div>
    </div>
    <div class="field">
      <label>목표 금액 (선택)</label>
      <input type="number" id="savingTarget" placeholder="0">
    </div>
    <div class="btn-row" style="margin-top:16px;">
      <button class="btn" onclick="saveSaving()">저장</button>
      <button class="btn secondary" onclick="closeModal('savingOverlay')">취소</button>
    </div>
  </div>
</div>

<!-- Loan Modal -->
<div class="overlay" id="loanOverlay">
  <div class="modal">
    <h3 id="loanModalTitle">대출 추가</h3>
    <input type="hidden" id="loanId">
    <div class="field">
      <label>대출기관</label>
      <input type="text" id="loanInstitution" placeholder="예: 우리은행 전세자금대출">
    </div>
    <div class="field-row">
      <div class="field">
        <label>대출 원금</label>
        <input type="number" id="loanPrincipal" placeholder="0">
      </div>
      <div class="field">
        <label>연 이자율 (%)</label>
        <input type="number" step="0.01" id="loanRate" placeholder="0">
      </div>
    </div>
    <div class="field">
      <label>상환방식</label>
      <select id="loanMethod">
        <option value="equal_pi">원리금균등상환</option>
        <option value="equal_principal">원금균등상환</option>
        <option value="bullet">만기일시상환</option>
      </select>
    </div>
    <div class="field-row">
      <div class="field">
        <label>대출 시작일</label>
        <input type="date" id="loanStartDate">
      </div>
      <div class="field">
        <label>대출 기간(개월)</label>
        <input type="number" id="loanTermMonths" placeholder="60">
      </div>
    </div>
    <div class="btn-row" style="margin-top:16px;">
      <button class="btn" onclick="saveLoan()">저장</button>
      <button class="btn secondary" onclick="closeModal('loanOverlay')">취소</button>
    </div>
  </div>
</div>

<!-- Holding Modal -->
<div class="overlay" id="holdingOverlay">
  <div class="modal">
    <h3 id="holdingModalTitle">종목 추가</h3>
    <input type="hidden" id="holdingId">
    <div class="field">
      <label>종목명</label>
      <input type="text" id="holdingName" placeholder="예: 삼성전자">
    </div>
    <div class="field-row">
      <div class="field">
        <label>계좌 (증권사 등)</label>
        <input type="text" id="holdingAccount" placeholder="예: 미래에셋">
      </div>
      <div class="field">
        <label>자산군</label>
        <select id="holdingAssetClass">
          <option value="주식">주식</option>
          <option value="채권">채권</option>
          <option value="금">금</option>
          <option value="코인">코인</option>
          <option value="부동산">부동산</option>
          <option value="기타">기타</option>
        </select>
      </div>
    </div>
    <div class="field">
      <label>종목코드 (선택 — 국내주식 6자리, 자동 시세 반영에 사용)</label>
      <input type="text" id="holdingStockCode" placeholder="예: 005930">
    </div>
    <div class="field-row">
      <div class="field">
        <label>수량</label>
        <input type="number" id="holdingQuantity" placeholder="0">
      </div>
      <div class="field">
        <label>평균단가</label>
        <input type="number" id="holdingAvgPrice" placeholder="0">
      </div>
    </div>
    <div class="field">
      <label>현재가 (종목코드 입력 시 자동 갱신, 없으면 수동 입력)</label>
      <input type="number" id="holdingCurrentPrice" placeholder="0">
    </div>
    <div class="btn-row" style="margin-top:16px;">
      <button class="btn" onclick="saveHolding()">저장</button>
      <button class="btn secondary" onclick="closeModal('holdingOverlay')">취소</button>
    </div>
  </div>
</div>

<!-- Cash Modal -->
<div class="overlay" id="cashOverlay">
  <div class="modal">
    <h3 id="cashModalTitle">현금성 자산 추가</h3>
    <input type="hidden" id="cashId">
    <div class="field">
      <label>이름</label>
      <input type="text" id="cashName" placeholder="예: 주거래통장, 비상금">
    </div>
    <div class="field">
      <label>금액</label>
      <input type="number" id="cashAmount" placeholder="0">
    </div>
    <div class="btn-row" style="margin-top:16px;">
      <button class="btn" onclick="saveCash()">저장</button>
      <button class="btn secondary" onclick="closeModal('cashOverlay')">취소</button>
    </div>
  </div>
</div>

<!-- Allocation Target Modal -->
<div class="overlay" id="allocOverlay">
  <div class="modal">
    <h3 id="allocModalTitle">자산군 목표 비중 추가</h3>
    <input type="hidden" id="allocId">
    <div class="field">
      <label>자산군</label>
      <input type="text" id="allocClass" placeholder="예: 주식, 현금, 저축성자산, 금">
    </div>
    <div class="field-row">
      <div class="field">
        <label>목표 비중(%)</label>
        <input type="number" id="allocTarget" placeholder="0">
      </div>
    </div>
    <div class="field-row">
      <div class="field">
        <label>허용 최소(%)</label>
        <input type="number" id="allocMin" placeholder="0">
      </div>
      <div class="field">
        <label>허용 최대(%)</label>
        <input type="number" id="allocMax" placeholder="0">
      </div>
    </div>
    <div class="btn-row" style="margin-top:16px;">
      <button class="btn" onclick="saveAlloc()">저장</button>
      <button class="btn secondary" onclick="closeModal('allocOverlay')">취소</button>
    </div>
  </div>
</div>

<script>
/* ================= DATA LAYER ================= */
const STORAGE_KEY = 'household_ledger_v1';

function defaultData(){
  return {
    categories: [
      {id: uid(), group:'식비', name:'외식/배달', type:'variable', budget:400000},
      {id: uid(), group:'식비', name:'장보기', type:'variable', budget:300000},
      {id: uid(), group:'교통', name:'대중교통/유류비', type:'variable', budget:150000},
      {id: uid(), group:'주거', name:'월세/관리비', type:'fixed', budget:900000},
      {id: uid(), group:'통신', name:'통신비', type:'fixed', budget:60000},
      {id: uid(), group:'구독', name:'OTT/구독서비스', type:'fixed', budget:30000},
      {id: uid(), group:'보험', name:'보험료', type:'fixed', budget:200000},
      {id: uid(), group:'문화/여가', name:'취미/여가', type:'variable', budget:150000},
    ],
    transactions: [],
    incomes: [],
    transfers: [],
    savings: [],
    loans: [],
    holdings: [],
    cashAssets: [],
    allocationTargets: [],
    profitThreshold: 30,
    lastModified: Date.now()
  };
}

function uid(){ return Math.random().toString(36).slice(2,10) + Date.now().toString(36); }

let DATA = loadData();

function loadData(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return defaultData();
    const parsed = JSON.parse(raw);
    if(!parsed.categories || !parsed.transactions) return defaultData();
    // migrate older saves that predate savings/investment fields
    parsed.savings = parsed.savings || [];
    parsed.loans = parsed.loans || [];
    parsed.holdings = parsed.holdings || [];
    parsed.cashAssets = parsed.cashAssets || [];
    parsed.allocationTargets = parsed.allocationTargets || [];
    parsed.profitThreshold = parsed.profitThreshold ?? 30;
    parsed.incomes = parsed.incomes || [];
    parsed.transfers = parsed.transfers || [];
    parsed.lastModified = parsed.lastModified || Date.now();
    return parsed;
  }catch(e){
    console.error('load error', e);
    return defaultData();
  }
}

function saveData(opts){
  opts = opts || {};
  if(!opts.skipTouch) DATA.lastModified = Date.now();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DATA));
  renderAll();
  if(!opts.skipAutoSync) scheduleAutoSync();
}

/* ================= GOOGLE DRIVE SYNC ================= */
const DRIVE_FILE_NAME = 'household_ledger_data.json';
const DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.file';
const CLIENT_ID_KEY = 'household_ledger_gclient_id';
const DRIVE_FILEID_KEY = 'household_ledger_drive_fileid';
const AUTOSYNC_KEY = 'household_ledger_autosync';

let gTokenClient = null;
let gAccessToken = null;
let gDriveFileId = localStorage.getItem(DRIVE_FILEID_KEY) || null;
let gAutoSyncTimer = null;

function toggleDriveHelp(){
  const el = document.getElementById('driveHelp');
  el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

function saveClientId(){
  const id = document.getElementById('gClientId').value.trim();
  localStorage.setItem(CLIENT_ID_KEY, id);
  initGoogleClient();
}

function setDriveStatus(msg){
  document.getElementById('driveStatus').textContent = msg;
}

function initGoogleClient(){
  const clientId = localStorage.getItem(CLIENT_ID_KEY);
  const idInput = document.getElementById('gClientId');
  if(clientId) idInput.value = clientId;
  const autoSync = localStorage.getItem(AUTOSYNC_KEY) === '1';
  document.getElementById('autoSyncToggle').checked = autoSync;
  if(!clientId || typeof google === 'undefined' || !google.accounts){
    return;
  }
  gTokenClient = google.accounts.oauth2.initTokenClient({
    client_id: clientId,
    scope: DRIVE_SCOPE,
    callback: async (resp)=>{
      if(resp.error){
        setDriveStatus('로그인 실패: ' + resp.error);
        return;
      }
      gAccessToken = resp.access_token;
      document.getElementById('gPullBtn').disabled = false;
      document.getElementById('gPushBtn').disabled = false;
      setDriveStatus('로그인됨. 동기화 준비 완료.');
      await driveSyncPull(true);
    }
  });
}

function driveSignIn(){
  const clientId = localStorage.getItem(CLIENT_ID_KEY);
  if(!clientId){
    alert('먼저 Google OAuth 클라이언트 ID를 입력해주세요. (위 "설정 방법 보기" 참고)');
    return;
  }
  if(!gTokenClient) initGoogleClient();
  if(!gTokenClient){
    alert('Google 로그인 스크립트를 아직 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
    return;
  }
  gTokenClient.requestAccessToken({prompt: gAccessToken ? '' : 'consent'});
}

async function driveApiFetch(url, options){
  options = options || {};
  options.headers = Object.assign({}, options.headers, {Authorization: 'Bearer ' + gAccessToken});
  const res = await fetch(url, options);
  if(res.status === 401){
    throw new Error('AUTH_EXPIRED');
  }
  return res;
}

async function driveFindFile(){
  if(gDriveFileId){
    // verify it still exists
    const res = await driveApiFetch(`https://www.googleapis.com/drive/v3/files/${gDriveFileId}?fields=id,modifiedTime,trashed`);
    if(res.ok){
      const meta = await res.json();
      if(!meta.trashed) return gDriveFileId;
    }
    gDriveFileId = null;
  }
  const q = encodeURIComponent(`name='${DRIVE_FILE_NAME}' and trashed=false`);
  const res = await driveApiFetch(`https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id,name,modifiedTime)&spaces=drive`);
  const data = await res.json();
  if(data.files && data.files.length){
    gDriveFileId = data.files[0].id;
    localStorage.setItem(DRIVE_FILEID_KEY, gDriveFileId);
    return gDriveFileId;
  }
  return null;
}

async function driveDownloadContent(fileId){
  const res = await driveApiFetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`);
  if(!res.ok) throw new Error('다운로드 실패');
  return await res.json();
}

async function driveUploadContent(){
  const metadata = {name: DRIVE_FILE_NAME, mimeType: 'application/json'};
  const boundary = 'ledgerBoundary' + Date.now();
  const body =
    `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n` +
    `--${boundary}\r\nContent-Type: application/json\r\n\r\n${JSON.stringify(DATA)}\r\n--${boundary}--`;
  const isUpdate = !!gDriveFileId;
  const url = isUpdate
    ? `https://www.googleapis.com/upload/drive/v3/files/${gDriveFileId}?uploadType=multipart`
    : `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart`;
  const res = await driveApiFetch(url, {
    method: isUpdate ? 'PATCH' : 'POST',
    headers: {'Content-Type': `multipart/related; boundary=${boundary}`},
    body
  });
  if(!res.ok) throw new Error('업로드 실패');
  const result = await res.json();
  if(!isUpdate){
    gDriveFileId = result.id;
    localStorage.setItem(DRIVE_FILEID_KEY, gDriveFileId);
  }
  return result;
}

async function driveSyncPull(silent){
  if(!gAccessToken){ if(!silent) alert('먼저 Google 로그인을 해주세요.'); return; }
  try{
    setDriveStatus('Drive에서 확인 중...');
    const fileId = await driveFindFile();
    if(!fileId){
      setDriveStatus('Drive에 저장된 데이터가 아직 없습니다. "Drive로 업로드"로 최초 업로드하세요.');
      return;
    }
    const remote = await driveDownloadContent(fileId);
    const remoteTime = remote.lastModified || 0;
    const localTime = DATA.lastModified || 0;
    if(remoteTime > localTime){
      if(silent || confirm('Drive에 더 최신 데이터가 있습니다. 현재 화면 데이터를 Drive 데이터로 덮어쓸까요?')){
        DATA = remote;
        saveData({skipTouch:true, skipAutoSync:true});
        setDriveStatus('Drive 데이터로 업데이트됨 · ' + new Date(remoteTime).toLocaleString('ko-KR'));
      }else{
        setDriveStatus('가져오기를 취소했습니다.');
      }
    }else{
      setDriveStatus('이미 최신 상태입니다 · ' + new Date(localTime).toLocaleString('ko-KR'));
    }
  }catch(e){
    if(e.message === 'AUTH_EXPIRED'){
      setDriveStatus('로그인이 만료되었습니다. 다시 로그인해주세요.');
      gAccessToken = null;
    }else{
      setDriveStatus('가져오기 실패: ' + e.message);
    }
  }
}

async function driveSyncPush(){
  if(!gAccessToken){ alert('먼저 Google 로그인을 해주세요.'); return; }
  try{
    setDriveStatus('Drive로 업로드 중...');
    await driveFindFile();
    await driveUploadContent();
    setDriveStatus('업로드 완료 · ' + new Date(DATA.lastModified).toLocaleString('ko-KR'));
  }catch(e){
    if(e.message === 'AUTH_EXPIRED'){
      setDriveStatus('로그인이 만료되었습니다. 다시 로그인해주세요.');
      gAccessToken = null;
    }else{
      setDriveStatus('업로드 실패: ' + e.message);
    }
  }
}

function toggleAutoSync(){
  const on = document.getElementById('autoSyncToggle').checked;
  localStorage.setItem(AUTOSYNC_KEY, on ? '1' : '0');
}

/* ---- KIS 파이프라인 연계: 시세 파일 자동 반영 ---- */
const PRICE_FILE_NAME = 'household_ledger_prices.json';

async function driveFindPriceFile(){
  const q = encodeURIComponent(`name='${PRICE_FILE_NAME}' and trashed=false`);
  const res = await driveApiFetch(`https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id,name,modifiedTime)&spaces=drive`);
  const data = await res.json();
  if(data.files && data.files.length) return data.files[0].id;
  return null;
}

async function syncPricesFromDrive(){
  const statusEl = document.getElementById('priceSyncStatus');
  if(!gAccessToken){
    statusEl.textContent = '먼저 "백업/복원" 탭에서 Google 로그인을 해주세요.';
    return;
  }
  try{
    statusEl.textContent = '시세 파일 확인 중...';
    const fileId = await driveFindPriceFile();
    if(!fileId){
      statusEl.textContent = 'Drive에 아직 시세 파일이 없습니다. KIS 파이프라인 쪽 설정을 먼저 완료해주세요.';
      return;
    }
    const priceData = await driveDownloadContent(fileId);
    const prices = priceData.prices || {};
    let matched = 0;
    DATA.holdings.forEach(h=>{
      if(h.stockCode && prices[h.stockCode] != null){
        h.currentPrice = Number(prices[h.stockCode]) || h.currentPrice;
        h.lastUpdated = todayStr();
        matched++;
      }
    });
    if(matched>0){
      saveData();
      statusEl.textContent = `${matched}개 종목 시세 반영 완료 · 파이프라인 갱신시각 ${priceData.updatedAt ? new Date(priceData.updatedAt).toLocaleString('ko-KR') : '-'}`;
    }else{
      statusEl.textContent = '종목코드가 일치하는 보유 종목이 없습니다. 종목 수정에서 종목코드를 입력해주세요.';
    }
  }catch(e){
    if(e.message === 'AUTH_EXPIRED'){
      statusEl.textContent = '로그인이 만료되었습니다. "백업/복원" 탭에서 다시 로그인해주세요.';
      gAccessToken = null;
    }else{
      statusEl.textContent = '시세 반영 실패: ' + e.message;
    }
  }
}

function scheduleAutoSync(){
  if(localStorage.getItem(AUTOSYNC_KEY) !== '1') return;
  if(!gAccessToken) return;
  if(gAutoSyncTimer) clearTimeout(gAutoSyncTimer);
  gAutoSyncTimer = setTimeout(()=>{ driveSyncPush(); }, 2500);
}

window.addEventListener('load', ()=>{
  // google script loads async; poll briefly until available
  let tries = 0;
  const t = setInterval(()=>{
    tries++;
    if(typeof google !== 'undefined' && google.accounts){
      clearInterval(t);
      initGoogleClient();
    }else if(tries > 40){
      clearInterval(t);
    }
  }, 250);
});

/* ================= UTIL ================= */
function won(n){
  n = Math.round(Number(n)||0);
  return n.toLocaleString('ko-KR') + '원';
}
function monthKey(dateStr){ return (dateStr||'').slice(0,7); }
function todayStr(){ return new Date().toISOString().slice(0,10); }
function shiftMonth(dateStr, delta){
  const d = new Date(dateStr);
  d.setMonth(d.getMonth()+delta);
  return d.toISOString().slice(0,10);
}
function currentMonthKey(){ return todayStr().slice(0,7); }
function nextMonthKey(){
  const d = new Date();
  d.setMonth(d.getMonth()+1);
  return d.toISOString().slice(0,7);
}
function lastNMonthKeys(n){
  const arr=[];
  const d = new Date();
  for(let i=n-1;i>=0;i--){
    const dd = new Date(d.getFullYear(), d.getMonth()-i, 1);
    arr.push(dd.toISOString().slice(0,7));
  }
  return arr;
}
function catById(id){ return DATA.categories.find(c=>c.id===id); }

/* ================= TABS ================= */
document.getElementById('tabNav').addEventListener('click', (e)=>{
  const btn = e.target.closest('button[data-tab]');
  if(!btn) return;
  switchTab(btn.dataset.tab);
});
function switchTab(tab){
  document.querySelectorAll('#tabNav button').forEach(b=>b.classList.toggle('active', b.dataset.tab===tab));
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.getElementById('view-'+tab).classList.add('active');
}

function closeModal(id){ document.getElementById(id).classList.remove('active'); }

/* ================= TRANSACTIONS ================= */
function onMethodChange(){
  const method = document.getElementById('txMethod').value;
  const useDate = document.getElementById('txUseDate').value || todayStr();
  if(method !== 'credit'){
    document.getElementById('txPayDate').value = useDate;
  }
}
document.getElementById('txUseDate').addEventListener('change', ()=>{
  const method = document.getElementById('txMethod').value;
  if(method !== 'credit'){
    document.getElementById('txPayDate').value = document.getElementById('txUseDate').value;
  } else if(!document.getElementById('txPayDate').value){
    document.getElementById('txPayDate').value = shiftMonth(document.getElementById('txUseDate').value, 1);
  }
});

function fillCategorySelect(selectEl, selectedId){
  selectEl.innerHTML = DATA.categories
    .map(c=>`<option value="${c.id}" ${c.id===selectedId?'selected':''}>${c.group} / ${c.name} (${c.type==='fixed'?'고정비':'변동비'})</option>`)
    .join('');
}

function openTxModal(id){
  document.getElementById('txModalTitle').textContent = id ? '지출 수정' : '지출 추가';
  document.getElementById('txId').value = id || '';
  fillCategorySelect(document.getElementById('txCategory'));
  if(id){
    const tx = DATA.transactions.find(t=>t.id===id);
    document.getElementById('txMethod').value = tx.method;
    document.getElementById('txUseDate').value = tx.useDate;
    document.getElementById('txPayDate').value = tx.payDate;
    document.getElementById('txCardName').value = tx.cardName||'';
    document.getElementById('txInstallment').value = tx.installmentMonths||1;
    document.getElementById('txCategory').value = tx.categoryId;
    document.getElementById('txAmount').value = tx.amount;
    document.getElementById('txMemo').value = tx.memo||'';
    document.getElementById('txOneOff').checked = !!tx.oneOff;
  }else{
    document.getElementById('txMethod').value = 'credit';
    document.getElementById('txUseDate').value = todayStr();
    document.getElementById('txPayDate').value = shiftMonth(todayStr(),1);
    document.getElementById('txCardName').value = '';
    document.getElementById('txInstallment').value = 1;
    document.getElementById('txAmount').value = '';
    document.getElementById('txMemo').value = '';
    document.getElementById('txOneOff').checked = false;
  }
  document.getElementById('txOverlay').classList.add('active');
}

function saveTx(){
  const id = document.getElementById('txId').value;
  const method = document.getElementById('txMethod').value;
  const useDate = document.getElementById('txUseDate').value;
  let payDate = document.getElementById('txPayDate').value;
  const cardName = document.getElementById('txCardName').value;
  const installmentMonths = Math.max(1, parseInt(document.getElementById('txInstallment').value)||1);
  const categoryId = document.getElementById('txCategory').value;
  const amount = Number(document.getElementById('txAmount').value)||0;
  const memo = document.getElementById('txMemo').value;
  const oneOff = document.getElementById('txOneOff').checked;

  if(!useDate || !amount || !categoryId){
    alert('사용일, 금액, 카테고리는 필수입니다.');
    return;
  }
  if(method !== 'credit'){ payDate = useDate; }

  // remove existing (edit = delete+recreate, handles installment split cleanly)
  if(id){
    DATA.transactions = DATA.transactions.filter(t=>t.groupId !== id && t.id !== id);
  }

  if(method === 'credit' && installmentMonths > 1){
    const perMonth = Math.round(amount / installmentMonths);
    const groupId = id || uid();
    let remaining = amount;
    for(let i=0;i<installmentMonths;i++){
      const amt = (i === installmentMonths-1) ? remaining : perMonth;
      remaining -= amt;
      DATA.transactions.push({
        id: uid(), groupId, method, useDate, payDate: shiftMonth(payDate, i),
        cardName, installmentMonths, installmentSeq:`${i+1}/${installmentMonths}`,
        categoryId, amount: amt, memo, oneOff
      });
    }
  }else{
    DATA.transactions.push({
      id: id || uid(), method, useDate, payDate, cardName,
      installmentMonths:1, installmentSeq:null,
      categoryId, amount, memo, oneOff
    });
  }
  closeModal('txOverlay');
  saveData();
}

function deleteTx(id){
  if(!confirm('이 지출 내역을 삭제할까요?')) return;
  const tx = DATA.transactions.find(t=>t.id===id);
  if(tx && tx.groupId){
    DATA.transactions = DATA.transactions.filter(t=>t.groupId !== tx.groupId);
  }else{
    DATA.transactions = DATA.transactions.filter(t=>t.id !== id);
  }
  saveData();
}

function renderTransactions(){
  const body = document.getElementById('txTableBody');
  const sorted = [...DATA.transactions].sort((a,b)=> b.useDate.localeCompare(a.useDate));
  body.innerHTML = sorted.map(t=>{
    const c = catById(t.categoryId);
    const catLabel = c ? `${c.group} / ${c.name}` : '(삭제된 카테고리)';
    const methodLabel = {credit:'신용카드', check:'체크카드', cash:'현금/이체'}[t.method] || t.method;
    return `<tr>
      <td class="num">${t.useDate}</td>
      <td class="num">${t.payDate}${t.installmentSeq? ` <span class="tag variable">${t.installmentSeq}</span>`:''}</td>
      <td>${methodLabel}${t.cardName? ' · '+t.cardName:''}</td>
      <td>${catLabel} ${c && c.type==='fixed' ? '<span class="tag fixed">고정</span>':''}</td>
      <td>${t.memo||''} ${t.oneOff?'<span class="tag oneoff">일회성</span>':''}</td>
      <td class="right num">${won(t.amount)}</td>
      <td><button class="icon-btn" onclick="openTxModal('${t.groupId||t.id}')">수정</button></td>
      <td><button class="icon-btn" onclick="deleteTx('${t.id}')">삭제</button></td>
    </tr>`;
  }).join('');
  document.getElementById('txEmpty').style.display = sorted.length? 'none':'block';
}

/* ================= INCOME ================= */
function onIncomeRecurringChange(){
  const rec = document.getElementById('incomeRecurring').checked;
  document.getElementById('incomeRecurringRow').style.display = rec? 'flex':'none';
  document.getElementById('incomeOneTimeRow').style.display = rec? 'none':'block';
}
function openIncomeModal(id){
  document.getElementById('incomeModalTitle').textContent = id? '수입 수정':'수입 추가';
  document.getElementById('incomeId').value = id||'';
  if(id){
    const inc = DATA.incomes.find(x=>x.id===id);
    document.getElementById('incomeName').value = inc.name;
    document.getElementById('incomeCategory').value = inc.category;
    document.getElementById('incomeAmount').value = inc.amount;
    document.getElementById('incomeRecurring').checked = inc.recurring;
    document.getElementById('incomeStartMonth').value = inc.startMonth||currentMonthKey();
    document.getElementById('incomeEndMonth').value = inc.endMonth||'';
    document.getElementById('incomeDate').value = inc.date||todayStr();
  }else{
    document.getElementById('incomeName').value='';
    document.getElementById('incomeCategory').value='급여';
    document.getElementById('incomeAmount').value='';
    document.getElementById('incomeRecurring').checked = true;
    document.getElementById('incomeStartMonth').value = currentMonthKey();
    document.getElementById('incomeEndMonth').value = '';
    document.getElementById('incomeDate').value = todayStr();
  }
  onIncomeRecurringChange();
  document.getElementById('incomeOverlay').classList.add('active');
}
function saveIncome(){
  const id = document.getElementById('incomeId').value;
  const recurring = document.getElementById('incomeRecurring').checked;
  const data = {
    name: document.getElementById('incomeName').value.trim(),
    category: document.getElementById('incomeCategory').value,
    amount: Number(document.getElementById('incomeAmount').value)||0,
    recurring,
    startMonth: recurring ? (document.getElementById('incomeStartMonth').value || currentMonthKey()) : null,
    endMonth: recurring ? (document.getElementById('incomeEndMonth').value || null) : null,
    date: recurring ? null : (document.getElementById('incomeDate').value || todayStr())
  };
  if(!data.name || !data.amount){ alert('항목명과 금액은 필수입니다.'); return; }
  if(id){
    Object.assign(DATA.incomes.find(i=>i.id===id), data);
  }else{
    DATA.incomes.push({id:uid(), ...data});
  }
  closeModal('incomeOverlay');
  saveData();
}
function deleteIncome(id){
  if(!confirm('이 수입 항목을 삭제할까요?')) return;
  DATA.incomes = DATA.incomes.filter(i=>i.id!==id);
  saveData();
}
function renderIncomes(){
  const body = document.getElementById('incomeTableBody');
  body.innerHTML = DATA.incomes.map(inc=>{
    const period = inc.recurring
      ? `${inc.startMonth||'-'} ~ ${inc.endMonth||'계속'}`
      : (inc.date||'-');
    return `<tr>
      <td>${inc.name}</td>
      <td>${inc.category}</td>
      <td class="right num">${won(inc.amount)}</td>
      <td>${inc.recurring? '<span class="tag up" style="background:var(--accent-soft); color:var(--accent);">매월</span>' : '<span class="tag">1회</span>'}</td>
      <td class="num">${period}</td>
      <td><button class="icon-btn" onclick="openIncomeModal('${inc.id}')">수정</button></td>
      <td><button class="icon-btn" onclick="deleteIncome('${inc.id}')">삭제</button></td>
    </tr>`;
  }).join('');
  document.getElementById('incomeEmpty').style.display = DATA.incomes.length? 'none':'block';
}
function incomeTotalForMonth(mk){
  let total = 0;
  DATA.incomes.forEach(inc=>{
    if(inc.recurring){
      if(inc.startMonth && mk >= inc.startMonth && (!inc.endMonth || mk <= inc.endMonth)){
        total += inc.amount;
      }
    }else{
      if(monthKey(inc.date)===mk) total += inc.amount;
    }
  });
  return total;
}

/* ================= TRANSFERS (저축/투자 입금 기록) ================= */
function openTransferModal(id){
  document.getElementById('transferModalTitle').textContent = id? '저축/투자 입금 수정':'저축/투자 입금 기록';
  document.getElementById('transferId').value = id||'';
  if(id){
    const t = DATA.transfers.find(x=>x.id===id);
    document.getElementById('transferDate').value = t.date;
    document.getElementById('transferType').value = t.type;
    document.getElementById('transferAmount').value = t.amount;
    document.getElementById('transferMemo').value = t.memo||'';
  }else{
    document.getElementById('transferDate').value = todayStr();
    document.getElementById('transferType').value = 'invest';
    document.getElementById('transferAmount').value = '';
    document.getElementById('transferMemo').value = '';
  }
  document.getElementById('transferOverlay').classList.add('active');
}
function saveTransfer(){
  const id = document.getElementById('transferId').value;
  const data = {
    date: document.getElementById('transferDate').value,
    type: document.getElementById('transferType').value,
    amount: Number(document.getElementById('transferAmount').value)||0,
    memo: document.getElementById('transferMemo').value.trim()
  };
  if(!data.date || !data.amount){ alert('날짜와 금액은 필수입니다.'); return; }
  if(id){
    Object.assign(DATA.transfers.find(t=>t.id===id), data);
  }else{
    DATA.transfers.push({id:uid(), ...data});
  }
  closeModal('transferOverlay');
  saveData();
}
function deleteTransfer(id){
  if(!confirm('이 입금 기록을 삭제할까요?')) return;
  DATA.transfers = DATA.transfers.filter(t=>t.id!==id);
  saveData();
}
function transferTotalForMonth(mk, type){
  return DATA.transfers
    .filter(t=> monthKey(t.date)===mk && t.type===type)
    .reduce((s,t)=>s+t.amount,0);
}
function monthlySavingsContribution(mk){
  let total = 0;
  DATA.savings.forEach(s=>{
    if(s.type!=='installment') return;
    const startMk = monthKey(s.startDate);
    const endMk = shiftMonth(s.startDate, s.termMonths).slice(0,7);
    if(mk >= startMk && mk < endMk) total += s.amount;
  });
  return total;
}
function monthSummary(mk){
  const income = incomeTotalForMonth(mk);
  const expense = DATA.transactions.filter(t=>monthKey(t.useDate)===mk).reduce((s,t)=>s+t.amount,0);
  const saving = monthlySavingsContribution(mk) + transferTotalForMonth(mk,'saving');
  const invest = transferTotalForMonth(mk,'invest');
  const leftover = income - expense - saving - invest;
  return {income, expense, saving, invest, leftover};
}

/* ================= CATEGORIES ================= */
function openCatModal(id){
  document.getElementById('catModalTitle').textContent = id? '항목 수정':'항목 추가';
  document.getElementById('catId').value = id||'';
  if(id){
    const c = catById(id);
    document.getElementById('catGroup').value = c.group;
    document.getElementById('catName').value = c.name;
    document.getElementById('catType').value = c.type;
    document.getElementById('catBudget').value = c.budget||'';
  }else{
    document.getElementById('catGroup').value='';
    document.getElementById('catName').value='';
    document.getElementById('catType').value='variable';
    document.getElementById('catBudget').value='';
  }
  document.getElementById('catOverlay').classList.add('active');
}
function saveCat(){
  const id = document.getElementById('catId').value;
  const group = document.getElementById('catGroup').value.trim();
  const name = document.getElementById('catName').value.trim();
  const type = document.getElementById('catType').value;
  const budget = Number(document.getElementById('catBudget').value)||0;
  if(!group || !name){ alert('대분류와 세부항목명을 입력해주세요.'); return; }
  if(id){
    const c = catById(id);
    Object.assign(c, {group, name, type, budget});
  }else{
    DATA.categories.push({id:uid(), group, name, type, budget});
  }
  closeModal('catOverlay');
  saveData();
}
function deleteCat(id){
  const used = DATA.transactions.some(t=>t.categoryId===id);
  if(used && !confirm('이 카테고리를 사용하는 지출 내역이 있습니다. 그래도 삭제할까요? (내역은 유지되나 카테고리 표시가 사라집니다)')) return;
  DATA.categories = DATA.categories.filter(c=>c.id!==id);
  saveData();
}
function renderCategories(){
  const body = document.getElementById('catTableBody');
  const sorted = [...DATA.categories].sort((a,b)=> a.group.localeCompare(b.group));
  body.innerHTML = sorted.map(c=>`
    <tr>
      <td>${c.group}</td>
      <td>${c.name}</td>
      <td><span class="tag ${c.type}">${c.type==='fixed'?'고정비':'변동비'}</span></td>
      <td class="right num">${c.budget? won(c.budget):'-'}</td>
      <td><button class="icon-btn" onclick="openCatModal('${c.id}')">수정</button></td>
      <td><button class="icon-btn" onclick="deleteCat('${c.id}')">삭제</button></td>
    </tr>
  `).join('');
  document.getElementById('catEmpty').style.display = sorted.length? 'none':'block';
}

/* ================= SAVINGS ================= */
function onSavingTypeChange(){
  const type = document.getElementById('savingType').value;
  document.getElementById('savingAmountLabel').textContent = type==='installment' ? '월 납입액' : '예치 원금';
}
function openSavingModal(id){
  document.getElementById('savingModalTitle').textContent = id? '저축 상품 수정':'저축 상품 추가';
  document.getElementById('savingId').value = id||'';
  if(id){
    const s = DATA.savings.find(x=>x.id===id);
    document.getElementById('savingName').value = s.name;
    document.getElementById('savingInstitution').value = s.institution;
    document.getElementById('savingType').value = s.type;
    document.getElementById('savingAmount').value = s.amount;
    document.getElementById('savingRate').value = s.rate;
    document.getElementById('savingStartDate').value = s.startDate;
    document.getElementById('savingTermMonths').value = s.termMonths;
    document.getElementById('savingTarget').value = s.target||'';
  }else{
    document.getElementById('savingName').value='';
    document.getElementById('savingInstitution').value='';
    document.getElementById('savingType').value='installment';
    document.getElementById('savingAmount').value='';
    document.getElementById('savingRate').value='';
    document.getElementById('savingStartDate').value = todayStr();
    document.getElementById('savingTermMonths').value = 12;
    document.getElementById('savingTarget').value='';
  }
  onSavingTypeChange();
  document.getElementById('savingOverlay').classList.add('active');
}
function saveSaving(){
  const id = document.getElementById('savingId').value;
  const data = {
    name: document.getElementById('savingName').value.trim(),
    institution: document.getElementById('savingInstitution').value.trim(),
    type: document.getElementById('savingType').value,
    amount: Number(document.getElementById('savingAmount').value)||0,
    rate: Number(document.getElementById('savingRate').value)||0,
    startDate: document.getElementById('savingStartDate').value,
    termMonths: Number(document.getElementById('savingTermMonths').value)||1,
    target: Number(document.getElementById('savingTarget').value)||0
  };
  if(!data.name || !data.startDate){ alert('상품명과 시작일은 필수입니다.'); return; }
  if(id){
    Object.assign(DATA.savings.find(s=>s.id===id), data);
  }else{
    DATA.savings.push({id:uid(), ...data});
  }
  closeModal('savingOverlay');
  saveData();
}
function deleteSaving(id){
  if(!confirm('이 저축 상품을 삭제할까요?')) return;
  DATA.savings = DATA.savings.filter(s=>s.id!==id);
  saveData();
}
function elapsedMonths(startDate, cap){
  const start = new Date(startDate);
  const now = new Date();
  let months = (now.getFullYear()-start.getFullYear())*12 + (now.getMonth()-start.getMonth());
  if(now.getDate() < start.getDate()) months -= 1;
  months = Math.max(0, months);
  if(cap!==undefined) months = Math.min(months, cap);
  return months;
}
function savingInfo(s){
  const m = elapsedMonths(s.startDate, s.termMonths);
  const paidSoFar = s.type==='installment' ? s.amount*m : s.amount;
  let fv;
  if(s.type==='installment'){
    fv = s.amount*s.termMonths + s.amount*(s.rate/100/12)*(s.termMonths*(s.termMonths+1)/2);
  }else{
    fv = s.amount*(1+(s.rate/100)*(s.termMonths/12));
  }
  const interest = fv - (s.type==='installment' ? s.amount*s.termMonths : s.amount);
  const afterTaxFv = fv - interest*0.154;
  const maturityDate = shiftMonth(s.startDate, s.termMonths);
  return {paidSoFar, fv, afterTaxFv, maturityDate};
}
function renderSavings(){
  const body = document.getElementById('savingTableBody');
  body.innerHTML = DATA.savings.map(s=>{
    const info = savingInfo(s);
    return `<tr>
      <td>${s.name}</td>
      <td>${s.institution}</td>
      <td>${s.type==='installment'?'적금':'예금/CMA'}</td>
      <td class="right num">${won(info.paidSoFar)}</td>
      <td class="right num">${won(info.afterTaxFv)}</td>
      <td class="num">${info.maturityDate}</td>
      <td><button class="icon-btn" onclick="openSavingModal('${s.id}')">수정</button></td>
      <td><button class="icon-btn" onclick="deleteSaving('${s.id}')">삭제</button></td>
    </tr>`;
  }).join('');
  document.getElementById('savingEmpty').style.display = DATA.savings.length? 'none':'block';
}

/* ================= LOANS ================= */
function openLoanModal(id){
  document.getElementById('loanModalTitle').textContent = id? '대출 수정':'대출 추가';
  document.getElementById('loanId').value = id||'';
  if(id){
    const l = DATA.loans.find(x=>x.id===id);
    document.getElementById('loanInstitution').value = l.institution;
    document.getElementById('loanPrincipal').value = l.principal;
    document.getElementById('loanRate').value = l.rate;
    document.getElementById('loanMethod').value = l.method;
    document.getElementById('loanStartDate').value = l.startDate;
    document.getElementById('loanTermMonths').value = l.termMonths;
  }else{
    document.getElementById('loanInstitution').value='';
    document.getElementById('loanPrincipal').value='';
    document.getElementById('loanRate').value='';
    document.getElementById('loanMethod').value='equal_pi';
    document.getElementById('loanStartDate').value = todayStr();
    document.getElementById('loanTermMonths').value = 60;
  }
  document.getElementById('loanOverlay').classList.add('active');
}
function saveLoan(){
  const id = document.getElementById('loanId').value;
  const data = {
    institution: document.getElementById('loanInstitution').value.trim(),
    principal: Number(document.getElementById('loanPrincipal').value)||0,
    rate: Number(document.getElementById('loanRate').value)||0,
    method: document.getElementById('loanMethod').value,
    startDate: document.getElementById('loanStartDate').value,
    termMonths: Number(document.getElementById('loanTermMonths').value)||1
  };
  if(!data.institution || !data.principal || !data.startDate){ alert('대출기관, 원금, 시작일은 필수입니다.'); return; }
  if(id){
    Object.assign(DATA.loans.find(l=>l.id===id), data);
  }else{
    DATA.loans.push({id:uid(), ...data});
  }
  closeModal('loanOverlay');
  saveData();
}
function deleteLoan(id){
  if(!confirm('이 대출을 삭제할까요?')) return;
  DATA.loans = DATA.loans.filter(l=>l.id!==id);
  saveData();
}
function loanInfo(l){
  const r = l.rate/100/12;
  const n = l.termMonths;
  const m = elapsedMonths(l.startDate, n);
  let remaining, payment, principalPortion, interestPortion;
  if(l.method==='equal_pi'){
    payment = r===0 ? l.principal/n : l.principal*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);
    const remainingBefore = r===0 ? l.principal - payment*m : l.principal*(Math.pow(1+r,n)-Math.pow(1+r,m))/(Math.pow(1+r,n)-1);
    interestPortion = remainingBefore*r;
    principalPortion = payment-interestPortion;
    remaining = Math.max(0, remainingBefore - principalPortion);
  }else if(l.method==='equal_principal'){
    principalPortion = l.principal/n;
    const remainingBefore = l.principal - principalPortion*m;
    interestPortion = remainingBefore*r;
    payment = principalPortion+interestPortion;
    remaining = Math.max(0, remainingBefore - principalPortion);
  }else{ // bullet
    principalPortion = m>=n ? l.principal : 0;
    interestPortion = l.principal*r;
    payment = interestPortion + principalPortion;
    remaining = m>=n ? 0 : l.principal;
  }
  const nextDue = shiftMonth(l.startDate, m+1);
  return {payment, principalPortion, interestPortion, remaining, nextDue};
}
function renderLoans(){
  const body = document.getElementById('loanTableBody');
  body.innerHTML = DATA.loans.map(l=>{
    const info = loanInfo(l);
    const methodLabel = {equal_pi:'원리금균등', equal_principal:'원금균등', bullet:'만기일시'}[l.method];
    return `<tr>
      <td>${l.institution}</td>
      <td class="right num">${won(l.principal)}</td>
      <td class="right num">${l.rate}%</td>
      <td>${methodLabel}</td>
      <td class="right num">${won(info.principalPortion)} / ${won(info.interestPortion)}</td>
      <td class="right num">${won(info.remaining)}</td>
      <td class="num">${info.nextDue}</td>
      <td><button class="icon-btn" onclick="openLoanModal('${l.id}')">수정</button></td>
      <td><button class="icon-btn" onclick="deleteLoan('${l.id}')">삭제</button></td>
    </tr>`;
  }).join('');
  document.getElementById('loanEmpty').style.display = DATA.loans.length? 'none':'block';
}
function totalLoanRemaining(){
  return DATA.loans.reduce((s,l)=> s+loanInfo(l).remaining, 0);
}
function totalSavingsPaid(){
  return DATA.savings.reduce((s,sv)=> s+savingInfo(sv).paidSoFar, 0);
}

/* ================= HOLDINGS (투자) ================= */
function openHoldingModal(id){
  document.getElementById('holdingModalTitle').textContent = id? '종목 수정':'종목 추가';
  document.getElementById('holdingId').value = id||'';
  if(id){
    const h = DATA.holdings.find(x=>x.id===id);
    document.getElementById('holdingName').value = h.name;
    document.getElementById('holdingAccount').value = h.account;
    document.getElementById('holdingAssetClass').value = h.assetClass;
    document.getElementById('holdingStockCode').value = h.stockCode||'';
    document.getElementById('holdingQuantity').value = h.quantity;
    document.getElementById('holdingAvgPrice').value = h.avgPrice;
    document.getElementById('holdingCurrentPrice').value = h.currentPrice;
  }else{
    document.getElementById('holdingName').value='';
    document.getElementById('holdingAccount').value='';
    document.getElementById('holdingAssetClass').value='주식';
    document.getElementById('holdingStockCode').value='';
    document.getElementById('holdingQuantity').value='';
    document.getElementById('holdingAvgPrice').value='';
    document.getElementById('holdingCurrentPrice').value='';
  }
  document.getElementById('holdingOverlay').classList.add('active');
}
function saveHolding(){
  const id = document.getElementById('holdingId').value;
  const data = {
    name: document.getElementById('holdingName').value.trim(),
    account: document.getElementById('holdingAccount').value.trim(),
    assetClass: document.getElementById('holdingAssetClass').value,
    stockCode: document.getElementById('holdingStockCode').value.trim(),
    quantity: Number(document.getElementById('holdingQuantity').value)||0,
    avgPrice: Number(document.getElementById('holdingAvgPrice').value)||0,
    currentPrice: Number(document.getElementById('holdingCurrentPrice').value)||0,
    lastUpdated: todayStr()
  };
  if(!data.name || !data.quantity){ alert('종목명과 수량은 필수입니다.'); return; }
  if(id){
    Object.assign(DATA.holdings.find(h=>h.id===id), data);
  }else{
    DATA.holdings.push({id:uid(), ...data});
  }
  closeModal('holdingOverlay');
  saveData();
}
function deleteHolding(id){
  if(!confirm('이 종목을 삭제할까요?')) return;
  DATA.holdings = DATA.holdings.filter(h=>h.id!==id);
  saveData();
}
function updateProfitThreshold(){
  DATA.profitThreshold = Number(document.getElementById('profitThreshold').value)||30;
  saveData();
}
function renderHoldings(){
  document.getElementById('profitThreshold').value = DATA.profitThreshold;
  const body = document.getElementById('holdingTableBody');
  body.innerHTML = DATA.holdings.map(h=>{
    const evalAmt = h.quantity*h.currentPrice;
    const costAmt = h.quantity*h.avgPrice;
    const gain = evalAmt-costAmt;
    const gainPct = costAmt? Math.round(gain/costAmt*1000)/10 : 0;
    const alertBadge = gainPct >= DATA.profitThreshold ? `<span class="tag up">차익실현 검토 +${gainPct}%</span>` : '';
    const codeBadge = h.stockCode ? `<span class="kpi-sub" style="margin-left:4px;">(${h.stockCode})</span>` : '';
    return `<tr>
      <td>${h.name}${codeBadge} ${alertBadge}</td>
      <td>${h.account}</td>
      <td>${h.assetClass}</td>
      <td class="right num">${h.quantity.toLocaleString('ko-KR')}</td>
      <td class="right num">${won(h.avgPrice)}</td>
      <td class="right num">${won(h.currentPrice)}</td>
      <td class="right num">${won(evalAmt)}</td>
      <td class="right num"><span class="tag ${gain>=0?'up':'down'}">${gain>=0?'+':''}${won(gain)} (${gainPct}%)</span></td>
      <td><button class="icon-btn" onclick="openHoldingModal('${h.id}')">수정</button></td>
      <td><button class="icon-btn" onclick="deleteHolding('${h.id}')">삭제</button></td>
    </tr>`;
  }).join('');
  document.getElementById('holdingEmpty').style.display = DATA.holdings.length? 'none':'block';
}
function totalHoldingsValue(){
  return DATA.holdings.reduce((s,h)=> s+h.quantity*h.currentPrice, 0);
}

/* ================= CASH ================= */
function openCashModal(id){
  document.getElementById('cashModalTitle').textContent = id? '현금 자산 수정':'현금성 자산 추가';
  document.getElementById('cashId').value = id||'';
  if(id){
    const c = DATA.cashAssets.find(x=>x.id===id);
    document.getElementById('cashName').value = c.name;
    document.getElementById('cashAmount').value = c.amount;
  }else{
    document.getElementById('cashName').value='';
    document.getElementById('cashAmount').value='';
  }
  document.getElementById('cashOverlay').classList.add('active');
}
function saveCash(){
  const id = document.getElementById('cashId').value;
  const data = {
    name: document.getElementById('cashName').value.trim(),
    amount: Number(document.getElementById('cashAmount').value)||0
  };
  if(!data.name){ alert('이름을 입력해주세요.'); return; }
  if(id){
    Object.assign(DATA.cashAssets.find(c=>c.id===id), data);
  }else{
    DATA.cashAssets.push({id:uid(), ...data});
  }
  closeModal('cashOverlay');
  saveData();
}
function deleteCash(id){
  if(!confirm('삭제할까요?')) return;
  DATA.cashAssets = DATA.cashAssets.filter(c=>c.id!==id);
  saveData();
}
function renderCash(){
  const body = document.getElementById('cashTableBody');
  body.innerHTML = DATA.cashAssets.map(c=>`
    <tr>
      <td>${c.name}</td>
      <td class="right num">${won(c.amount)}</td>
      <td><button class="icon-btn" onclick="openCashModal('${c.id}')">수정</button></td>
      <td><button class="icon-btn" onclick="deleteCash('${c.id}')">삭제</button></td>
    </tr>
  `).join('');
  document.getElementById('cashEmpty').style.display = DATA.cashAssets.length? 'none':'block';
}
function totalCash(){
  return DATA.cashAssets.reduce((s,c)=> s+c.amount, 0);
}

/* ================= ALLOCATION TARGETS / PORTFOLIO ================= */
function openAllocModal(id){
  document.getElementById('allocModalTitle').textContent = id? '목표 비중 수정':'자산군 목표 비중 추가';
  document.getElementById('allocId').value = id||'';
  if(id){
    const a = DATA.allocationTargets.find(x=>x.id===id);
    document.getElementById('allocClass').value = a.assetClass;
    document.getElementById('allocTarget').value = a.targetPct;
    document.getElementById('allocMin').value = a.bandMin;
    document.getElementById('allocMax').value = a.bandMax;
  }else{
    document.getElementById('allocClass').value='';
    document.getElementById('allocTarget').value='';
    document.getElementById('allocMin').value='';
    document.getElementById('allocMax').value='';
  }
  document.getElementById('allocOverlay').classList.add('active');
}
function saveAlloc(){
  const id = document.getElementById('allocId').value;
  const data = {
    assetClass: document.getElementById('allocClass').value.trim(),
    targetPct: Number(document.getElementById('allocTarget').value)||0,
    bandMin: Number(document.getElementById('allocMin').value)||0,
    bandMax: Number(document.getElementById('allocMax').value)||0
  };
  if(!data.assetClass){ alert('자산군명을 입력해주세요.'); return; }
  if(id){
    Object.assign(DATA.allocationTargets.find(a=>a.id===id), data);
  }else{
    DATA.allocationTargets.push({id:uid(), ...data});
  }
  closeModal('allocOverlay');
  saveData();
}
function deleteAlloc(id){
  if(!confirm('삭제할까요?')) return;
  DATA.allocationTargets = DATA.allocationTargets.filter(a=>a.id!==id);
  saveData();
}
function renderAllocTargets(){
  const body = document.getElementById('allocTargetTableBody');
  body.innerHTML = DATA.allocationTargets.map(a=>`
    <tr>
      <td>${a.assetClass}</td>
      <td class="right num">${a.targetPct}%</td>
      <td class="right num">${a.bandMin}%</td>
      <td class="right num">${a.bandMax}%</td>
      <td><button class="icon-btn" onclick="openAllocModal('${a.id}')">수정</button></td>
      <td><button class="icon-btn" onclick="deleteAlloc('${a.id}')">삭제</button></td>
    </tr>
  `).join('');
  document.getElementById('allocTargetEmpty').style.display = DATA.allocationTargets.length? 'none':'block';
}
function buildAssetClassTotals(){
  const totals = {};
  const addTo = (cls, amt)=>{ totals[cls]=(totals[cls]||0)+amt; };
  addTo('현금', totalCash());
  addTo('저축성자산', totalSavingsPaid());
  DATA.holdings.forEach(h=> addTo(h.assetClass, h.quantity*h.currentPrice));
  return totals;
}
function renderPortfolio(){
  const totals = buildAssetClassTotals();
  const grandTotal = Object.values(totals).reduce((a,b)=>a+b,0) || 1;

  const allClasses = new Set([...Object.keys(totals), ...DATA.allocationTargets.map(a=>a.assetClass)]);
  const body = document.getElementById('allocTableBody');
  if(!allClasses.size){
    document.getElementById('allocEmpty').style.display='block';
    body.innerHTML='';
  }else{
    document.getElementById('allocEmpty').style.display='none';
    body.innerHTML = [...allClasses].map(cls=>{
      const amt = totals[cls]||0;
      const pct = Math.round(amt/grandTotal*1000)/10;
      const target = DATA.allocationTargets.find(a=>a.assetClass===cls);
      let status = '<span class="tag variable">목표 미설정</span>';
      if(target){
        if(pct < target.bandMin) status = `<span class="tag down">밴드 미달 (목표 ${target.bandMin}~${target.bandMax}%)</span>`;
        else if(pct > target.bandMax) status = `<span class="tag up">밴드 초과 · 리밸런싱 검토 (목표 ${target.bandMin}~${target.bandMax}%)</span>`;
        else status = `<span class="tag down" style="background:var(--accent-soft); color:var(--accent);">밴드 내 정상</span>`;
      }
      return `<tr>
        <td>${cls}</td>
        <td class="right num">${won(amt)}</td>
        <td class="right num">${pct}%</td>
        <td class="right num">${target? target.targetPct+'%':'-'}</td>
        <td class="right num">${target? target.bandMin+'~'+target.bandMax+'%':'-'}</td>
        <td>${status}</td>
      </tr>`;
    }).join('');
  }

  // stock-level breakdown vs total assets
  const stockEl = document.getElementById('stockPortfolioBreakdown');
  if(!DATA.holdings.length){
    stockEl.innerHTML = '<div class="empty">등록된 보유 종목이 없습니다.</div>';
  }else{
    const sorted = [...DATA.holdings].sort((a,b)=> (b.quantity*b.currentPrice)-(a.quantity*a.currentPrice));
    const maxV = Math.max(...sorted.map(h=>h.quantity*h.currentPrice), 1);
    stockEl.innerHTML = sorted.map(h=>{
      const val = h.quantity*h.currentPrice;
      const pct = Math.round(val/grandTotal*1000)/10;
      const width = Math.max(4, Math.round(val/maxV*100));
      return `<div style="margin-bottom:10px;">
        <div style="display:flex; justify-content:space-between; font-size:13px; margin-bottom:4px;">
          <span>${h.name} <span class="muted">(${h.assetClass})</span></span><span class="num">${won(val)} · 전체자산 대비 ${pct}%</span>
        </div>
        <div class="progress-bg"><div class="progress-fill" style="width:${width}%;"></div></div>
      </div>`;
    }).join('');
  }
}

/* ================= DASHBOARD ================= */
let selectedDashMonth = null; // null = 이번 달

function monthLabel(mk){
  const [y,m] = mk.split('-');
  return `${y}년 ${Number(m)}월`;
}
function populateDashMonthSelect(){
  const sel = document.getElementById('dashMonthSelect');
  const cur = currentMonthKey();
  if(!selectedDashMonth) selectedDashMonth = cur;
  // 최근 18개월 + 데이터에 있는 달 중 그 범위를 벗어나는 달도 포함
  const monthsSet = new Set(lastNMonthKeys(18));
  DATA.transactions.forEach(t=>monthsSet.add(monthKey(t.useDate)));
  DATA.incomes.forEach(i=>{ if(!i.recurring && i.date) monthsSet.add(monthKey(i.date)); });
  const months = Array.from(monthsSet).sort().reverse();
  sel.innerHTML = months.map(mk=>`<option value="${mk}" ${mk===selectedDashMonth?'selected':''}>${monthLabel(mk)}${mk===cur?' (이번 달)':''}</option>`).join('');
}
function onDashMonthChange(){
  selectedDashMonth = document.getElementById('dashMonthSelect').value;
  renderDashboard();
}
function renderDashboard(){
  populateDashMonthSelect();
  const curKey = selectedDashMonth;
  const nextKey = shiftMonth(curKey+'-01', 1).slice(0,7);
  document.getElementById('dashMonthLabel').textContent = `${monthLabel(curKey)} 요약`;

  const totalAsset = totalCash() + totalSavingsPaid() + totalHoldingsValue();
  const totalDebt = totalLoanRemaining();
  document.getElementById('kpiTotalAsset').textContent = won(totalAsset);
  document.getElementById('kpiTotalDebt').textContent = won(totalDebt);
  document.getElementById('kpiNetWorth').textContent = won(totalAsset-totalDebt);
  document.getElementById('kpiNetSavings').textContent = won(totalSavingsPaid()-totalDebt);

  const thisMonthTx = DATA.transactions.filter(t=> monthKey(t.useDate)===curKey);
  const thisMonthTotal = thisMonthTx.reduce((s,t)=>s+t.amount,0);
  document.getElementById('kpiThisMonth').textContent = won(thisMonthTotal);
  document.getElementById('kpiThisMonthSub').textContent = `${thisMonthTx.length}건`;

  const nextPayTotal = DATA.transactions.filter(t=> monthKey(t.payDate)===nextKey).reduce((s,t)=>s+t.amount,0);
  document.getElementById('kpiNextPay').textContent = won(nextPayTotal);

  let fixedTotal=0, varTotal=0;
  thisMonthTx.forEach(t=>{
    const c = catById(t.categoryId);
    if(c && c.type==='fixed') fixedTotal += t.amount; else varTotal += t.amount;
  });
  document.getElementById('kpiFixed').textContent = won(fixedTotal);
  document.getElementById('kpiVariable').textContent = won(varTotal);
  const total = fixedTotal+varTotal || 1;
  document.getElementById('kpiFixedRatio').textContent = `총지출 대비 ${Math.round(fixedTotal/total*100)}%`;
  document.getElementById('kpiVariableRatio').textContent = `총지출 대비 ${Math.round(varTotal/total*100)}%`;

  // ---- 수입 대비 지출/저축/투자 ----
  const sum = monthSummary(curKey);
  document.getElementById('kpiIncome').textContent = won(sum.income);
  document.getElementById('kpiSavingFlow').textContent = won(sum.saving);
  document.getElementById('kpiInvestFlow').textContent = won(sum.invest);
  document.getElementById('kpiLeftover').textContent = won(sum.leftover);
  const incBase = sum.income || 1;
  document.getElementById('kpiSavingFlowRatio').textContent = `수입 대비 ${Math.round(sum.saving/incBase*100)}%`;
  document.getElementById('kpiInvestFlowRatio').textContent = `수입 대비 ${Math.round(sum.invest/incBase*100)}%`;
  document.getElementById('kpiLeftoverRatio').textContent = `수입 대비 ${Math.round(sum.leftover/incBase*100)}%`;

  const ibEl = document.getElementById('incomeBreakdownBar');
  if(!sum.income){
    ibEl.innerHTML = '<div class="empty">이 달에 등록된 수입이 없습니다. "수입" 탭에서 먼저 등록해주세요.</div>';
  }else{
    const segs = [
      {label:'지출', val: sum.expense, color:'var(--up)'},
      {label:'저축', val: sum.saving, color:'var(--accent)'},
      {label:'투자', val: sum.invest, color:'var(--variable)'},
      {label:'남는 돈', val: Math.max(0,sum.leftover), color:'var(--down)'},
    ];
    const barHtml = segs.map(s=>{
      const pct = Math.max(0, Math.round(s.val/incBase*100));
      return pct>0 ? `<div style="width:${pct}%; background:${s.color};" title="${s.label} ${pct}%"></div>` : '';
    }).join('');
    const legendHtml = segs.map(s=>{
      const pct = Math.round(s.val/incBase*100);
      return `<span style="display:inline-flex; align-items:center; gap:6px; margin-right:16px; font-size:13px;">
        <span style="width:10px; height:10px; border-radius:3px; background:${s.color}; display:inline-block;"></span>
        ${s.label} ${won(s.val)} (${pct}%)
      </span>`;
    }).join('');
    ibEl.innerHTML = `
      <div style="display:flex; width:100%; height:22px; border-radius:8px; overflow:hidden; background:var(--bg); margin-bottom:12px;">${barHtml}</div>
      <div>${legendHtml}</div>
    `;
  }

  // ---- 저축/투자 입금 기록 (선택한 달) ----
  const transferBody = document.getElementById('transferTableBody');
  const monthTransfers = DATA.transfers.filter(t=>monthKey(t.date)===curKey).sort((a,b)=>b.date.localeCompare(a.date));
  transferBody.innerHTML = monthTransfers.map(t=>`
    <tr>
      <td class="num">${t.date}</td>
      <td>${t.type==='saving'?'저축':'투자'}</td>
      <td class="right num">${won(t.amount)}</td>
      <td>${t.memo||''}</td>
      <td><button class="icon-btn" onclick="deleteTransfer('${t.id}')">삭제</button></td>
    </tr>`).join('');
  document.getElementById('transferEmpty').style.display = monthTransfers.length? 'none':'block';

  // ---- 월별 비교 (최근 6개월) ----
  const months6 = lastNMonthKeys(6);
  const mcBody = document.getElementById('monthCompareTableBody');
  mcBody.innerHTML = months6.map(mk=>{
    const s = monthSummary(mk);
    const rate = s.income ? Math.round((s.saving+s.invest)/s.income*100) : 0;
    return `<tr ${mk===curKey?'style="background:var(--bg);"':''}>
      <td class="num">${monthLabel(mk)}</td>
      <td class="right num">${won(s.income)}</td>
      <td class="right num">${won(s.expense)}</td>
      <td class="right num">${won(s.saving)}</td>
      <td class="right num">${won(s.invest)}</td>
      <td class="right num"><span class="tag ${s.leftover>=0?'up':'down'}">${won(s.leftover)}</span></td>
      <td class="right num">${rate}%</td>
    </tr>`;
  }).join('');

  // category breakdown bars
  const byCat = {};
  thisMonthTx.forEach(t=>{
    byCat[t.categoryId] = (byCat[t.categoryId]||0) + t.amount;
  });
  const entries = Object.entries(byCat).sort((a,b)=>b[1]-a[1]);
  const maxVal = entries.length? entries[0][1] : 1;
  const bdEl = document.getElementById('categoryBreakdown');
  if(!entries.length){
    bdEl.innerHTML = '<div class="empty">이 달의 지출 내역이 없습니다.</div>';
  }else{
    bdEl.innerHTML = entries.map(([cid,val])=>{
      const c = catById(cid);
      const label = c? `${c.group} / ${c.name}` : '(삭제된 카테고리)';
      const pct = Math.round(val/total*100);
      const width = Math.max(4, Math.round(val/maxVal*100));
      return `<div style="margin-bottom:10px;">
        <div style="display:flex; justify-content:space-between; font-size:13px; margin-bottom:4px;">
          <span>${label}</span><span class="num">${won(val)} (${pct}%)</span>
        </div>
        <div class="progress-bg"><div class="progress-fill" style="width:${width}%; background:${c&&c.type==='fixed'?'var(--fixed)':'var(--variable)'};"></div></div>
      </div>`;
    }).join('');
  }

  // budget progress
  const bpEl = document.getElementById('budgetProgress');
  const withBudget = DATA.categories.filter(c=>c.budget>0);
  if(!withBudget.length){
    bpEl.innerHTML = '<div class="empty">월예산이 설정된 카테고리가 없습니다.</div>';
  }else{
    bpEl.innerHTML = withBudget.map(c=>{
      const spent = byCat[c.id]||0;
      const pct = Math.min(999, Math.round(spent/c.budget*100));
      const over = spent > c.budget;
      return `<div style="margin-bottom:10px;">
        <div style="display:flex; justify-content:space-between; font-size:13px; margin-bottom:4px;">
          <span>${c.group} / ${c.name}</span>
          <span class="num">${won(spent)} / ${won(c.budget)} (${pct}%)</span>
        </div>
        <div class="progress-bg"><div class="progress-fill ${over?'over':''}" style="width:${Math.min(100,pct)}%;"></div></div>
      </div>`;
    }).join('');
  }
}

/* ================= TRENDS ================= */
function buildSparkSVG(values){
  const w=110,h=32,pad=3;
  const max = Math.max(...values,1);
  const min = Math.min(...values,0);
  const range = (max-min)||1;
  const stepX = (w-pad*2)/(values.length-1||1);
  const pts = values.map((v,i)=>{
    const x = pad + i*stepX;
    const y = h-pad - ((v-min)/range)*(h-pad*2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  const lastUp = values[values.length-1] >= values[values.length-2];
  const color = lastUp ? 'var(--up)' : 'var(--down)';
  return `<svg class="spark" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

function renderTrends(){
  const months = lastNMonthKeys(6);
  const curKey = months[months.length-1];
  const prevKey = months[months.length-2];
  const priorThree = months.slice(months.length-4, months.length-1); // 3 months before current

  const rows = [];
  DATA.categories.forEach(c=>{
    const monthlyVals = months.map(mk=>{
      return DATA.transactions
        .filter(t=>t.categoryId===c.id && !t.oneOff && monthKey(t.useDate)===mk)
        .reduce((s,t)=>s+t.amount,0);
    });
    const curVal = monthlyVals[monthlyVals.length-1];
    const prevVal = monthlyVals[monthlyVals.length-2] || 0;
    const avg3 = priorThree.map(mk=>{
      return DATA.transactions
        .filter(t=>t.categoryId===c.id && !t.oneOff && monthKey(t.useDate)===mk)
        .reduce((s,t)=>s+t.amount,0);
    });
    const avg3Val = avg3.length? avg3.reduce((a,b)=>a+b,0)/avg3.length : 0;

    const momDiff = curVal - prevVal;
    const momPct = prevVal ? Math.round(momDiff/prevVal*100) : (curVal? 100 : 0);
    const avgDiff = curVal - avg3Val;
    const avgPct = avg3Val ? Math.round(avgDiff/avg3Val*100) : (curVal? 100:0);

    if(monthlyVals.some(v=>v>0)){
      rows.push({c, monthlyVals, curVal, momDiff, momPct, avgDiff, avgPct});
    }
  });

  const body = document.getElementById('trendTableBody');
  if(!rows.length){
    document.getElementById('trendEmpty').style.display='block';
    body.innerHTML='';
  }else{
    document.getElementById('trendEmpty').style.display='none';
    body.innerHTML = rows.map(r=>`
      <tr>
        <td>${r.c.group}</td>
        <td>${r.c.name}</td>
        <td><span class="tag ${r.c.type}">${r.c.type==='fixed'?'고정비':'변동비'}</span></td>
        <td>${buildSparkSVG(r.monthlyVals)}</td>
        <td class="right num">${won(r.curVal)}</td>
        <td class="right num"><span class="tag ${r.momDiff>=0?'up':'down'}">${r.momDiff>=0?'▲':'▼'} ${won(Math.abs(r.momDiff))} (${r.momPct>=0?'+':''}${r.momPct}%)</span></td>
        <td class="right num"><span class="tag ${r.avgDiff>=0?'up':'down'}">${r.avgDiff>=0?'▲':'▼'} ${won(Math.abs(r.avgDiff))} (${r.avgPct>=0?'+':''}${r.avgPct}%)</span></td>
      </tr>
    `).join('');
  }

  // ranking
  const byAvgDiffDesc = [...rows].sort((a,b)=> b.avgDiff - a.avgDiff).filter(r=>r.avgDiff>0).slice(0,5);
  const byAvgDiffAsc = [...rows].sort((a,b)=> a.avgDiff - b.avgDiff).filter(r=>r.avgDiff<0).slice(0,5);

  document.getElementById('rankUp').innerHTML = byAvgDiffDesc.length ? byAvgDiffDesc.map(r=>`
    <div class="rank-item"><span>${r.c.group} / ${r.c.name}</span><span class="tag up">+${won(r.avgDiff)}</span></div>
  `).join('') : '<div class="empty">뚜렷하게 증가한 항목이 없습니다.</div>';

  document.getElementById('rankDown').innerHTML = byAvgDiffAsc.length ? byAvgDiffAsc.map(r=>`
    <div class="rank-item"><span>${r.c.group} / ${r.c.name}</span><span class="tag down">${won(r.avgDiff)}</span></div>
  `).join('') : '<div class="empty">뚜렷하게 감소한 항목이 없습니다.</div>';
}

/* ================= BACKUP ================= */
function exportJSON(){
  const blob = new Blob([JSON.stringify(DATA, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const dateStr = todayStr();
  a.href = url;
  a.download = `ledger_backup_${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
function importJSON(e){
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = (ev)=>{
    try{
      const parsed = JSON.parse(ev.target.result);
      if(!parsed.categories || !parsed.transactions) throw new Error('형식이 올바르지 않습니다.');
      DATA = parsed;
      saveData();
      alert('데이터를 불러왔습니다.');
    }catch(err){
      alert('JSON 파일을 읽는 중 오류가 발생했습니다: ' + err.message);
    }
    e.target.value = '';
  };
  reader.readAsText(file);
}
function resetAll(){
  if(!confirm('모든 데이터를 초기화합니다. 계속할까요? (백업하지 않았다면 복구할 수 없습니다)')) return;
  DATA = defaultData();
  saveData();
}

/* ================= RENDER ALL ================= */
function renderAll(){
  renderTransactions();
  renderIncomes();
  renderCategories();
  renderTrends();
  renderSavings();
  renderLoans();
  renderHoldings();
  renderCash();
  renderAllocTargets();
  renderPortfolio();
  renderDashboard();
  document.getElementById('backupInfo').textContent =
    `카테고리 ${DATA.categories.length}개 · 수입 ${DATA.incomes.length}개 · 지출 내역 ${DATA.transactions.length}건 · 저축 ${DATA.savings.length}개 · 대출 ${DATA.loans.length}개 · 보유종목 ${DATA.holdings.length}개`;
}
renderAll();
</script>
</body>
</html>
