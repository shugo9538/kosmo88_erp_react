// 거래처 상품(숨겨진것) disabled
$(document).ready(function() {
	$("input[name=item_name]:hidden").each(function(){
		$(this).prop("disabled", true);
	})
	
	$("input[name=category]:hidden").each(function(){
		$(this).prop("disabled", true);
	})
	
	$("input[name=price]:hidden").each(function(){
		$(this).prop("disabled", true);
	})
	
});

$('#clientManagementForm').ready(function(){
        addItem();
});

var i = 0;

// 거래처 상품 등록 추가
function addItem() {
	var item = document.getElementById("item");
	var addItemBtn = document.getElementById("addItem");
	var newItem = document.createElement("tr");
	
	newItem = item.cloneNode(true);
	newItem.setAttribute("class", "item");
	newItem.removeAttribute("style");
	
	tmp = newItem.getElementsByTagName('input');
	for (var j = 0 ; j < tmp.length ; j++) { 
		tmp[j].className = "form-control"+i;
	}
	
	Array.from(newItem.getElementsByClassName("form-control" + i)).forEach(f => f.removeAttribute("disabled"));
    Array.from(newItem.getElementsByClassName("form-control" + i)).forEach((f) =>
        f.setAttribute("required", true));
  
	document.getElementById("item-group").appendChild(newItem);
	i++;
}

// 거래처 상품 삭제
function delItem(obj) {
	var itemGroup = document.getElementById("item-group");
	var selectedItem = $(obj);
	var item = selectedItem.parent().parent();
	
	if (itemGroup.childElementCount < 3) {
		swal("최소 하나 이상의 상품을 등록해야 합니다.");
	} else {
		item.remove();
	}
}

// 입력 후 커서 이동
function nextRegisterNum1(){
	if(document.clientRegisterForm.register_num1.value.length >= 3){
		document.clientRegisterForm.register_num2.focus();
	}
}
function nextRegisterNum2(){
	if(document.clientRegisterForm.register_num2.value.length >= 2){
		document.clientRegisterForm.register_num3.focus();
	}
}
function nextRegisterNum3(){
	if(document.clientRegisterForm.register_num3.value.length >= 5){
		document.clientRegisterForm.email1.focus();
	}
}

function nextPhone1() {
	if(document.clientRegisterForm.phone1.value.length >= 3) {
		document.clientRegisterForm.phone2.focus();
	}
}

function nextPhone2() {
	if(document.clientRegisterForm.phone2.value.length >= 4) {
		document.clientRegisterForm.phone3.focus();
	}
}

function nextPhone3() {
	if(document.clientRegisterForm.phone3.value.length >= 4) {
		document.clientRegisterForm.zip_code.focus();
	}
}

// 이메일 체크
function selectEmailChk(){
	if(document.clientRegisterForm.email3.value == 0){ // 직접입력
		document.clientRegisterForm.email2.value = ""; // input 초기화
		document.clientRegisterForm.email2.focus();
	} else {
		document.clientRegisterForm.email2.value = document.clientRegisterForm.email3.value;
	}
}

// 우편번호 및 주소 검색 API
function daumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if(data.userSelectedType === 'R'){
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                document.getElementById("detail_address").value = extraAddr;
            
            } else {
                document.getElementById("detail_address").value = '';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('zip_code').value = data.zonecode;
            document.getElementById("address").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("detail_address").focus();
        }
    }).open();
}


