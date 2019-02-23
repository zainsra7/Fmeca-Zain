//List of all hazards
var hazard_list = [{
  title : "GSM-R failure",
  severity: 4,
  likelihood: 3,
  detection: "Certain",
  causes:"Lack of GSM jammer detection, physical monitoring and security in stations and around tracks",
  actions:"Anti GSM jammer techniques, communication protocols, monitoring",
},{
  title : "Level crossing bridge failure",
  severity: 5,
  likelihood: 3,
  detection: "Low",
  causes:"Lack of alternative physical solution",
  actions:"Apply more physical security and monitoring devices",
},{
  title : "Points failure",
  severity: 5,
  likelihood: 2,
  detection: "High",
  causes:"Lack of monitoring train status, scheduling",
  actions:"Use AI to monitor train status and scheduling algorithm",
},{
  title : "Train panel failure",
  severity: 5,
  likelihood: 1,
  detection: "Certain",
  causes:"Lack of attention, monitoring suspicious connections and activity",
  actions:"Strict policy and surveillance",
},{
  title : "Rail website DDOS attack",
  severity: 3,
  likelihood: 4,
  detection: "Moderate",
  causes:"Lack of security, firewall",
  actions:"Security updates, patches and strong firewall policy",
},{
  title : "Signal failure",
  severity: 3,
  likelihood: 3,
  detection: "Low",
  causes:"Lack of monitoring suspicious activity, and allowing signals to be changed by only authorised personals",
  actions:"Strict policy and surveillance",
},{
  title : "Public Wi-Fi malware attack",
  severity: 2,
  likelihood: 5,
  detection: "Uncertain",
  causes:"Lack of authentication, (login/signup)",
  actions:"Security patches and updates, Sign-up requirement, Captcha, monitoring status of traffic, alternative plans in case of attack",
},{
  title : "Rail website hack",
  severity: 3,
  likelihood: 4,
  detection: "Certain",
  causes:"Lack of security, firewall",
  actions:"Security updates, patches and strong firewall policy",
},{
  title : "Timetable board hack",
  severity: 3,
  likelihood: 4,
  detection: "Certain",
  causes:"Lack of security measures, firewall setup, monitoring suspicious activity",
  actions:"Monitoring and alternative plans in case of attack",
},{
  title : "Public Wi-Fi DDOS attack",
  severity: 2,
  likelihood: 5,
  detection: "Moderate",
  causes:"Lack of authentication, (login/signup)",
  actions:"Captcha, monitoring status of traffic, alternative plans in case of attack",
},{
  title : "On-station panel failure",
  severity: 3,
  likelihood: 2,
  detection: "High",
  causes:"Lack of security updates, patches and firewall",
  actions:"Regularly update computers and softwares",
},];

var matrix_showing = 1; //1 means true
var current_selected_hazard = ""; //Currently displayed hazard (in card)
var editMode = 0; //0 means false

updateRiskMatrix();

//Function that inserts hazard into the risk matrix
function insertHazard(likelihood, severity, title,detection,causes,actions){
  let newHazard = document.createElement('p');
  newHazard.innerHTML = "<a class ='waves-effect waves-light purple btn-small'>"+title+"</a>";
  newHazard.onclick = function(){
    displayModal(likelihood,severity,title,detection,causes,actions);
  }
  document.getElementById("riskMatrix").rows[likelihood].cells[severity].appendChild(newHazard);
}

//Function that calculates RPN for a particular hazard
//RPN = ((severity*0.65)*10) + ((likelihood*0.20)*10) + ((detection*0.15)*10)
function calculateRPN(severity,detection,likelihood){
  let detect_num = 1
  if(detection === "High") detect_num=2
  else if(detection === "Moderate") detect_num=3
  else if(detection === "Low") detect_num =4;
  else if(detection === "Uncertain") detect_num = 5;
  
  return ((severity*0.65)*10) + ((likelihood*0.20)*10) + ((detect_num*0.15)*10)
}

//Function to toggle between Table and Matrix
function viewMatrixTable(){
  closeQuestionnaire();
  closeCard();
  if(matrix_showing === 1){
    matrix_showing = 0;
    $("#riskMatrix").fadeOut();
    closeCard();
    updateTable();
    $("#hazardTable" ).slideDown("slow");
    $("#togglebtn").text("View Matrix");
  }else{
    matrix_showing=1;
    $("#hazardTable").hide();
    updateRiskMatrix();
    $("#riskMatrix").slideToggle("slow");
    $("#togglebtn").text("View Table");  
  }
}

//Function to add Hazard into the hazard_list
function AddHazard(){
  $('#hazard-form')[0].reset();
  closeCard();
  $("#add-hazard-view").slideDown();
}

//Function which inserts all the hazards from the hazard_list
//to the risk matrix
function updateRiskMatrix(){
  if(hazard_list.length < 1) alert("No Hazards to Show! Please Add New Hazards");
    clearMatrix();
    for(let i =0; i < hazard_list.length; i++){
      insertHazard(hazard_list[i]["likelihood"],hazard_list[i]["severity"],hazard_list[i]["title"],hazard_list[i]["detection"],hazard_list[i]["causes"],hazard_list[i]["actions"]);
    }
}

//Function to compare between Hazard A and B based on their RPN score
function compare (hazardA, hazardB){
  let RPN_A = calculateRPN(hazardA["severity"],hazardA["detection"],hazardA["likelihood"]);
    let RPN_B = calculateRPN(hazardB["severity"],hazardB["detection"],hazardB["likelihood"]);
  
  if(RPN_A > RPN_B) return -1;
  if(RPN_B > RPN_A) return 1;
  
  return 0;
}

//Function that resets the matrix on screen and deletes the hazard_list
function clearMatrix(){
  closeCard();
  let tr_list = document.getElementsByTagName('td');
  for(let i=7; i < 36; i++){
    if(!(i % 6 === 0)){
         tr_list[i].innerHTML = "";
    }
  }
}

//Function to reset matrix/table/modes/hazardlist
function resetMatrix(){
  editMode = 0;
  current_selected_hazard = "";
  matrix_showing = 1;
  hideAddHazard();
  clearMatrix()
  clearTable()
  $("#riskMatrix").show();
  $("#hazardTable").hide();
  hazard_list=[]
}

function clearTable(){
  document.getElementById("hazardTable-body").innerHTML = "";
}

function getHazardIndex(title){
  for(let i = 0; i < hazard_list.length; i++){
    if(hazard_list[i]["title"] === title){
      return i;
    }
  }
}

function deleteHazard(){
  let hazard_index = getHazardIndex(current_selected_hazard);
  hazard_list.splice(hazard_index,1);
  alert("Hazard Deleted Successfully!");
  updateRiskMatrix();
  updateTable();
}

//Editing a New Hazard
function editHazard(){
  $('#hazard-form')[0].reset();
  let hazard_index = getHazardIndex(current_selected_hazard);
  $("#input-title").val(hazard_list[hazard_index]["title"]);
  $("#input-causes").val(hazard_list[hazard_index]["causes"]);
  $("#input-detection").val(hazard_list[hazard_index]["detection"]);
  $("#input-severity").val(hazard_list[hazard_index]["severity"]);
  $("#input-occurance").val(hazard_list[hazard_index]["likelihood"]);
  $("#input-actions").val(hazard_list[hazard_index]["actions"]);
  closeCard();
  $("#add-hazard-view").show();
  editMode = 1;
}

//Adding a new Hazard
function saveChanges(){
  closeQuestionnaire();
  let title = $("#input-title").val();
  let causes = $("#input-causes").val();
  let detection = $("#input-detection").find(":selected").val();
  let severity = $("#input-severity").find(":selected").val();
  let occurance = $("#input-occurance").find(":selected").val();
  let actions = $("#input-actions").val();

  if(editMode === 1){
    if(title.length < 1 || detection === "" || severity === "" || occurance === ""){
      alert("Please give Hazard Title, Detection, Severity and Occurance rate!");
    }else{
      let hazard_index = getHazardIndex(current_selected_hazard);
      hazard_list[hazard_index]["title"] = title;
      hazard_list[hazard_index]["causes"] = causes;
      hazard_list[hazard_index]["detection"] = detection;
      hazard_list[hazard_index]["severity"] = severity;
      hazard_list[hazard_index]["likelihood"] = occurance;
      hazard_list[hazard_index]["actions"] = actions;
      editMode = 0;
    }
  }else{
  if(checkAlreadyExistHazard(title)){
    alert("Hazard with the given title already exists!")
    return -1;
  }
  if(title.length < 1 || detection === "" || severity === "" || occurance === ""){
    alert("Please give Hazard Title, Detection, Severity and Occurance rate!");
  }else{
    hazard_list.push({
      "title": title,
      "causes": causes,
      "detection": detection,
      "severity": severity,
      "likelihood": occurance,
      "actions": actions
    });
    }
  }
  updateRiskMatrix();
  updateTable();
  $('#hazard-form')[0].reset();
}

function checkAlreadyExistHazard(title){
  for(let i =0; i < hazard_list.length; i++){
      if(hazard_list[i]["title"] === title) return true;
  }
  return false;
}

//Displaying information of a particular Hazard
function displayModal(likelihood, severity, title,detection,causes,actions){
  $("#hazard-title").html("<i>"+title+"</i>");
  $("#hazard-detection").html("<b>Detection:</b> " + detection);
  $("#hazard-causes").html("<b>Causes:</b> " + causes);
  $("#hazard-actions").html("<b>Actions:</b> " + actions);
  $("#hazard-rpn").html("<b>RPN:</b> " + calculateRPN(severity,detection,likelihood));
  $("#hazard-card").show();
  current_selected_hazard = title;
  hideAddHazard();
}

function updateTable(){
  if(hazard_list.length < 1) alert("No Hazards to Show! Please Add New Hazards");
    clearTable();
    hazard_list.sort(compare);
    var result_table = "";
    for(let i =0; i < hazard_list.length; i++){
      result_table += insertHazardTable(i+1,hazard_list[i]["likelihood"],hazard_list[i]["severity"],hazard_list[i]["title"],hazard_list[i]["detection"],hazard_list[i]["causes"],hazard_list[i]["actions"]);
    }
    document.getElementById("hazardTable-body").innerHTML = result_table;
}

function insertHazardTable(rank,likelihood, severity, title,detection,causes,actions){
  return "<tr><td>"+rank+"</td><td>"+title+"</td>" + "<td>"+severity+"</td>" + "<td>"+likelihood+"</td>" + "<td>"+detection+"</td>" + "<td>"+causes+"</td>" + "<td>"+actions+"</td>" + "<td>"+calculateRPN(severity,detection,likelihood)+"</td></tr>";
 }

function closeCard(){
  $("#hazard-card").hide();
  $("#info-card").slideUp("slow");
}

function hideAddHazard(){
  $('#hazard-form')[0].reset();
  $("#add-hazard-view").hide();
}

function showInfo(){
  $("#info-card").slideDown("slow")
}

function showQuestionnaire(){
  closeCard();
  $("#hazardTable" ).hide();
  $("#riskMatrix").hide();
  $("#add-hazard-view").hide();
  $("#questionnaire").show();
}

function closeQuestionnaire(){
  $("#questionnaire").hide();
}