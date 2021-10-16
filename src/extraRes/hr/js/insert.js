import $ from "jquery";

var i = 0;
export function addAttendance() {
  var attendance = document.getElementById("attendance");
  var addAttendanceBtn = document.getElementById("addAttendance");
  let newAttendance = document.createElement("tr");
  newAttendance = attendance.cloneNode(true);
  newAttendance.removeAttribute("style");
  let tmp = newAttendance.getElementsByTagName("input");
  for (var j = 0; j < tmp.length; j++) {
    tmp[j].className = "form-control" + i;
  }

  Array.from(newAttendance.getElementsByClassName("form-control" + i)).forEach(
    (f) => f.removeAttribute("disabled")
  );

  Array.from(newAttendance.getElementsByClassName("form-control" + i)).forEach(
    (f) => f.setAttribute("required", true)
  );
  document.getElementById("attendance-group").appendChild(newAttendance);
  i++;
}

export function delAttendance(obj) {
  let attendanceGroup = document.getElementById("attendance-group");
  var selectedAttendance = $(obj);
  var attendance = selectedAttendance.parent().parent();

  if (attendanceGroup.childElementCount < 3) {
    alert("최소 하나 이상의 랙은 등록해야 합니다.");
  } else {
    attendance.remove();
  }
}
