const employees = [

  {
    name:"Rahul",
    department:"Reception"
  },

  {
    name:"Priya",
    department:"Housekeeping"
  },

  {
    name:"Amit",
    department:"Kitchen"
  },

  {
    name:"Suresh",
    department:"Maintenance"
  },

  {
    name:"Rohit",
    department:"Restaurant"
  }

];

const tableBody =
document.getElementById("tableBody");

const attendanceDate =
document.getElementById("attendanceDate");

attendanceDate.value =
new Date().toISOString().split("T")[0];

function renderTable(){

  tableBody.innerHTML = "";

  employees.forEach((employee,index)=>{

    const row =
    document.createElement("tr");

    row.innerHTML = `

      <td>${employee.name}</td>

      <td>${employee.department}</td>

      <td>

        <select
          id="status-${index}"
          onchange="updateCounts()"
        >

          <option value="P">
            Present
          </option>

          <option value="A">
            Absent
          </option>

          <option value="L">
            Leave
          </option>

          <option value="WO">
            Weekly Off
          </option>

        </select>

      </td>

    `;

    tableBody.appendChild(row);

  });

  updateCounts();

}

renderTable();

function updateCounts(){

  let present = 0;
  let absent = 0;
  let leave = 0;
  let wo = 0;

  employees.forEach((employee,index)=>{

    const select =
    document.getElementById(`status-${index}`);

    const value =
    select.value;

    select.classList.remove(
      "present",
      "absent",
      "leave",
      "wo"
    );

    if(value === "P"){
      present++;
      select.classList.add("present");
    }

    if(value === "A"){
      absent++;
      select.classList.add("absent");
    }

    if(value === "L"){
      leave++;
      select.classList.add("leave");
    }

    if(value === "WO"){
      wo++;
      select.classList.add("wo");
    }

  });

  document.getElementById(
    "presentCount"
  ).innerText = present;

  document.getElementById(
    "absentCount"
  ).innerText = absent;

  document.getElementById(
    "leaveCount"
  ).innerText = leave;

  document.getElementById(
    "woCount"
  ).innerText = wo;

}

function saveAttendance(){

  const attendance = [];

  employees.forEach((employee,index)=>{

    attendance.push({

      employee:employee.name,

      department:employee.department,

      status:document.getElementById(
        `status-${index}`
      ).value

    });

  });

  localStorage.setItem(
    "attendance",
    JSON.stringify(attendance)
  );

  alert("Attendance Saved");

}

document.getElementById("searchInput")
.addEventListener("keyup",function(){

  const value =
  this.value.toLowerCase();

  const rows =
  document.querySelectorAll("tbody tr");

  rows.forEach((row)=>{

    row.style.display =
    row.innerText.toLowerCase()
    .includes(value)
    ? ""
    : "none";

  });

});
