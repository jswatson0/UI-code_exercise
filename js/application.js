$(document).ready(function() {
  // Here's the initial data. Again: don't worry about persistence :)
 var data = [
    { name: "Mark-Paul Gosselaar", photo_url: "" },
    { name: "Delta Burke", photo_url: "img/avatars/delta.png" },
    { name: "Alf", photo_url: "img/avatars/alf.png" },
    { name: "Jaleel White", photo_url: "img/avatars/jaleel.png" },
    { name: "Ralph Macchio", photo_url: "img/avatars/ralph.png" },
    { name: "Candace Cameron", photo_url: "img/avatars/candace.png" },
    { name: "Patrick Duffy", photo_url: "img/avatars/pduff.png" },
    { name: "Arnold Schwartzengger", photo_url: "img/avatars/arnold.png" }
  ];

  // reverse the data array for correct order based on 'mockups/initial.png'
  data.reverse();

  var employee_list = document.getElementById('employee-list');

  buildList();

  // initialize page with existing employee data
  function buildList() {
    _.each(data, function(employee) {
      populateTemplate(employee);
      employee_list.appendChild(employee_template);
    });
  }

  // add a new employee
  function addEmployee(name, photo) {
    var new_employee = {name: name, photo_url: photo};
    populateTemplate(new_employee);

    // insert new employee at beginning of list
    employee_list.insertBefore(employee_template, employee_list.firstChild);
  }

  // this function serves to populate the employee card template. It was created to avoid repeating the same block of
  // code in both the buildList and addEmployee functions.
  function populateTemplate(employee) {
    employee_template = document.getElementById('template').content.cloneNode(true);

    if (employee.photo_url) {
      employee_template.querySelector('.avatar img').src = employee.photo_url;
    } else {
      employee_template.querySelector('.avatar img').src = "img/default.png";
    }
    employee_template.querySelector('.name').innerText = employee.name;
    employee_template.querySelector('.remove img').src = "img/close.png";

    return employee_template;
  }

  // submit the employee form
  $("#form").submit(function(e) {
    var name = $("input[name='name']").val();
    var photo = $("input[name='photo_url']").val() || "";

    addEmployee(name, photo);

    // clear input fields after submit
    $("input[name='name']").val("");
    $("input[name='photo_url']").val("");

    // don't reload the page
    e.preventDefault();
  });

  // show and hide the remove button on hover
  $(employee_list).on("mouseenter", "div.employee-card", function () {
    $(this).find(".remove").toggle();
  });

  $(employee_list).on("mouseleave", "div.employee-card", function () {
    $(this).find(".remove").toggle();
  });

  // remove the employee card on click
  $(employee_list).on("click", "span.remove", function() {
    $(this).parent(".employee-card").hide();
  });
});
