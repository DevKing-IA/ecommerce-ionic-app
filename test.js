   /*Validate alphabets*/
  function IsValidName(e) {
                var k;
                document.all ? k = e.keyCode : k = e.which;
                return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || k == 190 || k == 188);
            };


   function update_estimator(ID){
   
   }
       function add_price(ID){
   
        
    let total_Quantity = 0;
  for(let i =0 ; i< document.getElementsByClassName("calculateValue").length ; i++){
if(document.getElementsByClassName("calculateValue")[i].value != null && document.getElementsByClassName("calculateValue")[i].value != undefined && document.getElementsByClassName("calculateValue")[i].value > 0){


if(document.getElementsByClassName("calculateValue")[i].id === "myNumber"  )
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)*2) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber1" ||document.getElementsByClassName("calculateValue")[i].id === "myNumber2")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)*0.4) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber3")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)*2.4) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber4")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)*6) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber5")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)*15) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber6")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)*6) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber7")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)*4) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber8")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)* 0.4) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber9")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)* 0.4) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber10")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)* 7) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber11")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)* 4) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber12")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)* 5) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber13")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)* 4) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber14")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)* 4) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber15")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)* 1) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber16")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)* 8) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber17")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)* 5) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber18")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)* 8) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber19")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)* 6) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber20")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)* 1) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber21")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)* 6) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber22")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)* 4) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber23")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)* 4) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber24")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)* 0.5) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber25")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)* 1) * 1000)/1000;
else
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)* 1) * 1000)/1000;
}
  }

  document.getElementById("total-Price").innerHTML = parseInt(total_Quantity * 35);
  add_time(ID);
       }


 function add_time(ID){
        
    let total_Quantity = 0;

  for(let i =0 ; i< document.getElementsByClassName("calculateValue").length ; i++){
 
if(document.getElementsByClassName("calculateValue")[i].value != null && document.getElementsByClassName("calculateValue")[i].value != undefined && document.getElementsByClassName("calculateValue")[i].value > 0){



if(document.getElementsByClassName("calculateValue")[i].id === "myNumber"  )
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)*2) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber1" ||document.getElementsByClassName("calculateValue")[i].id === "myNumber2")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)*0.4) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber3")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)*2.4) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber4")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)*6) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber5")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)*15) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber6")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)*6) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber7")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)*4) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber8")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)* 0.4) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber9")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)* 0.4) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber10")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)* 7) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber11")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)* 4) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber12")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)* 5) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber13")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)* 4) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber14")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)* 4) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber15")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)* 1) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber16")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)* 8) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber17")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)* 5) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber18")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)* 8) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber19")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)* 6) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber20")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)* 1) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber21")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)* 6) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber22")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)* 4) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber23")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)* 4) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber24")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)* 0.5) * 1000)/1000;
else if(document.getElementsByClassName("calculateValue")[i].id ===  "myNumber25")
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)* 1) * 1000)/1000;
else
total_Quantity = parseInt(total_Quantity) + Math.round( (parseInt(document.getElementsByClassName("calculateValue")[i].value)* 1) * 1000)/1000;

}
  }
   console.log(total_Quantity);    
  document.getElementById("total-time").innerHTML = total_Quantity;
       }
        $(document).ready(function() {
            $.extend($.expr[':'], {
                'containsi': function(elem, i, match, array) {
                    return (elem.textContent || elem.innerText || '').toLowerCase()
                        .indexOf((match[3] || "").toLowerCase()) >= 0;
                }
            });
            $("#autocomplete").on("keyup", function() {
                var filter = $(this).val();
                console.log('******filter*********');
                console.log(filter);
                if (filter) {
                    console.log(filter);
                    $('#serviceList div.container').find("span.h4:not(:containsi(" + filter + "))").parent().parent().parent().hide();
                    $('#serviceList div.container').find("span.h4:containsi(" + filter + ")").parent().parent().parent().show();
                } else {
                    $('#serviceList div.container').find("span.h4:containsi()").parent().parent().parent().show();
                }

            });

        });
       $(document).ready(function(){
        $("button").click(function(){
           // $("ol").append("<li><a href='javascript:void(0);' class='remove'>&times;</a> Salesforce Consultation</li>"); 
        });
        $(document).on("click", "a.remove" , function() {
            $(this).parent().remove();
        });
    });
     let removeDuplicate = new Set();
 console.log(!removeDuplicate.has(name) ); 
function add_estimator_review(id, name , c){
    var item_id = 'childItem_'+id;
    console.log(item_id)
    var item_value = document.getElementById(id).value;
    var quantityValue = $('.'+c).val()
    console.log(quantityValue + !removeDuplicate.has(name) )
    if( !removeDuplicate.has(name) ){
        var childItem = '<li><a href="javascript:void(0);" class="remove" onclick="remove_item(\''+name+'\'  , \''+c+'\' , \''+id+'\'); return false">×</a> '+name+'  <p style="float:right;margin:0;margin-right: 26px;" class="quan'+c+'">'+quantityValue+'</p></li>';
      //  childItem += '<div class="quote-box" id="estimater_add" align="right">';
          // childItem += '<span class="minus min_item">-</span>';
               // childItem += '<input class="quote" id="'+item_id+'" type="number" value="'+item_value+'" onkeydown="javascript: return event.keyCode == 69 ? false : true">';
            //    childItem += '<span class="plus add_item">+</span> </div> </li>';
        $("ol").append(childItem);

        removeDuplicate.add(name);
    }else{
        $('.quan'+c).html(quantityValue)
        //document.getElementById(item_id).value =  item_value;
    }
}
function remove_item(name , c , ID) {
console.log(document.getElementById(ID));
   // if(document.getElementById(ID).value === 0){
   if( removeDuplicate.has(name) ){

        removeDuplicate.delete(name);

    }
    $('.'+c).val(0);
    myFunction(ID)
}
        function myFunction(Id) {
           // document.getElementById(Id).stepUp(1);
          add_price(Id);
        }
        $(document).ready(function() {
            $('.minus').click(function() {
                var $input = $(this).parent().find('input');
                console.log($(this).parent().find('input'));
                if (parseInt($input.val()) > 0) {
                    var count = parseInt($input.val()) - 1;
                    // count = count < 1 ? 1 : count;
                    $input.val(count);
                   // $input.change();
                }
                return false;
            });
            $('.plus').click(function() {
                var $input = $(this).parent().find('input');
                $input.val(parseInt($input.val()) + 1);
               // $input.change();
                return false;
            });
        });



        window.addEventListener("scroll", myScrollFunc);

        $('.btn').on('click', function() {
            var $this = $(this);
            $this.button('loading');
            setTimeout(function() {
                $this.button('reset');
            }, 8000);
        });

       function submitform() {
$("#form").submit(function(e) {
e.preventDefault();
});

var productlist = [];
var consultation = document.getElementById("Number").value;
if (consultation != 'undefined' && consultation != null && parseInt(consultation) > 0) {
productlist.push({
"name": "Salesforce Consultation",
"value": parseInt(consultation)
});
}

var approval = document.getElementById("myNumber").value;
if (approval != 'undefined' && approval != null && parseInt(approval) > 0) {
productlist.push({
"name": "Approval Processes",
"value": parseInt(approval)
});
}

var report = document.getElementById("myNumber1").value;
if (report != 'undefined' && report != null && parseInt(report) > 0) {
productlist.push({
"name": "Reports",
"value": parseInt(report)
});
}

var dashboard = document.getElementById("myNumber2").value;
if (dashboard != 'undefined' && dashboard != null && parseInt(dashboard) > 0) {
productlist.push({
"name": "Dashboards",
"value": parseInt(dashboard)
});
}

var salesProc = document.getElementById("myNumber3").value;
if (salesProc != 'undefined' && salesProc != null && parseInt(salesProc) > 0) {
productlist.push({
"name": "Sales Cloud, Sales Processses",
"value": parseInt(salesProc)
});
}

var community = document.getElementById("myNumber4").value;
if (community != 'undefined' && community != null && parseInt(community) > 0) {
productlist.push({
"name": "Community Portal",
"value": parseInt(community)
});
}

var serviceCloud = document.getElementById("myNumber5").value;
if (serviceCloud != 'undefined' && serviceCloud != null && parseInt(serviceCloud) > 0) {
productlist.push({
"name": "Service Cloud, Customer Service Processses",
"value": parseInt(serviceCloud)
});
}

var integration = document.getElementById("myNumber6").value;
if (integration != 'undefined' && integration != null && parseInt(integration) > 0) {
productlist.push({
"name": "System Integration",
"value": parseInt(integration)
});
}

var projectMan = document.getElementById("myNumber7").value;
if (projectMan != 'undefined' && projectMan != null && parseInt(projectMan) > 0) {
productlist.push({
"name": "Project Management App",
"value": parseInt(projectMan)
});
}

var workflow = document.getElementById("myNumber8").value;
if (workflow != 'undefined' && workflow != null && parseInt(workflow) > 0) {
productlist.push({
"name": "Workflows",
"value": parseInt(workflow)
});
}

var emailTemp = document.getElementById("myNumber9").value;
if (emailTemp != 'undefined' && emailTemp != null && parseInt(emailTemp) > 0) {
productlist.push({
"name": "Email Templates",
"value": parseInt(emailTemp)
});
}

var livechat = document.getElementById("myNumber10").value;
if (livechat != 'undefined' && livechat != null && parseInt(livechat) > 0) {
productlist.push({
"name": "Live Chat",
"value": parseInt(livechat)
});
}

var shipment = document.getElementById("myNumber11").value;
if (shipment != 'undefined' && shipment != null && parseInt(shipment) > 0) {
productlist.push({
"name": "Shipment Tracking",
"value": parseInt(shipment)
});
}

var permission = document.getElementById("myNumber12").value;
if (permission != 'undefined' && permission != null && parseInt(permission) > 0) {
productlist.push({
"name": "Users, Security, Permissions",
"value": parseInt(permission)
});
}

var duplicate = document.getElementById("myNumber13").value;
if (duplicate != 'undefined' && duplicate != null && parseInt(duplicate) > 0) {
productlist.push({
"name": "Duplicate Blocking",
"value": parseInt(duplicate)
});
}

var emailMark = document.getElementById("myNumber14").value;
if (emailMark != 'undefined' && emailMark != null && parseInt(emailMark) > 0) {
productlist.push({
"name": "Email Marketing",
"value": parseInt(emailMark)
});
}

var trackCustom = document.getElementById("myNumber15").value;
if (trackCustom != 'undefined' && trackCustom != null && parseInt(trackCustom) > 0) {
productlist.push({
"name": "Track Custom Data",
"value": parseInt(trackCustom)
});
}

var inventory = document.getElementById("myNumber16").value;
if (inventory != 'undefined' && inventory != null && parseInt(inventory) > 0) {
productlist.push({
"name": "Inventory Tracking",
"value": parseInt(inventory)
});
}

var cardProcessing = document.getElementById("myNumber17").value;
if (cardProcessing != 'undefined' && cardProcessing != null && parseInt(cardProcessing) > 0) {
productlist.push({
"name": "Credit Card Processing",
"value": parseInt(cardProcessing)
});
}

var dedupData = document.getElementById("myNumber18").value;
if (dedupData != 'undefined' && dedupData != null && parseInt(dedupData) > 0) {
productlist.push({
"name": "Dedupe Existing Data",
"value": parseInt(dedupData)
});
}

var ctiadp = document.getElementById("myNumber19").value;
if (ctiadp != 'undefined' && ctiadp != null && parseInt(ctiadp) > 0) {
productlist.push({
"name": "Soft Phone / CTI Adapater",
"value": parseInt(ctiadp)
});
}

var training = document.getElementById("myNumber20").value;
if (training != 'undefined' && training != null && parseInt(training) > 0) {
productlist.push({
"name": "Training",
"value": parseInt(training)
});
}

var docCreate = document.getElementById("myNumber21").value;
if (docCreate != 'undefined' && docCreate != null && parseInt(docCreate) > 0) {
productlist.push({
"name": "Document Creation",
"value": parseInt(docCreate)
});
}

var faxing = document.getElementById("myNumber22").value;
if (faxing != 'undefined' && faxing != null && parseInt(faxing) > 0) {
productlist.push({
"name": "Faxing",
"value": parseInt(faxing)
});
}

var eleSignature = document.getElementById("myNumber23").value;
if (eleSignature != 'undefined' && eleSignature != null && parseInt(eleSignature) > 0) {
productlist.push({
"name": "Electronic Signature",
"value": parseInt(eleSignature)
});
}

var smsAlert = document.getElementById("myNumber24").value;
if (smsAlert != 'undefined' && smsAlert != null && parseInt(smsAlert) > 0) {
productlist.push({
"name": "SMS and Phone Call Alerts",
"value": parseInt(smsAlert)
});
}

var migration = document.getElementById("myNumber25").value;
if (migration != 'undefined' && migration != null && parseInt(migration) > 0) {
productlist.push({
"name": "Import / Migrate Existing Data",
"value": parseInt(migration)
});
}


var name = $('.enterName').val();
var email = $('.enterEmail').val();
var companyName  =''// $('#companyName').val();
var enterPhone  = $('#enterPhone').val();
var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

if (email.trim() != null && email.trim() != '' && !isValidEmail(email)) {
$(".emailError").remove();
$("#enterEmail").after('<span class="emailError">Please enter your Business email address.');
return;
} else if( !emailPattern.test(email.trim()) ){
$(".emailError").remove();
$("#enterEmail").after('<span class="emailError">Please enter valid email address.');
return;
}else {
$(".emailError").remove();
}


if (name.trim() != null && name.trim() != '' && email.trim() != null && email.trim() != '' ) {

if( productlist != null && productlist.length == 0){

Swal.fire({
title: 'Sorry',
text: "Your Quote Is Empty. Please select One Or More Services.",
icon: 'error',
confirmButtonColor: '#3085d6',
confirmButtonText: 'Ok'
}).then((result) => {
if (result.value) {
setTimeout(function(){ window.scrollTo(0,0);},400);
}
})

return;
}else if( productlist.length > 0){
var jsonObject = {};
jsonObject['name'] = name;
jsonObject['company'] = companyName;
jsonObject['email'] = email;
jsonObject['phone'] = enterPhone;
jsonObject['products'] = productlist;

console.log(JSON.stringify(jsonObject));

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
console.log(this.status);
console.log(this.responseText);
if (this.readyState == 4 && this.status == 200) {
console.log(this.responseText);
Swal.fire(
'Congratulations!',
'Your Quote Is On Its Way. Please Check Your Email.',
'success'
)
}else if( this.status == 400 ){
Swal.fire(
'Error',
'Something worng, Please contact to admin.',
'error'
)
}
};

               var url = 'https://saleshic.secure.force.com/Hicestimator/services/apexrest/estimator';
xhttp.open("POST", url, true);
xhttp.setRequestHeader("Content-type", "application/json");
	
xhttp.send(JSON.stringify(jsonObject));
}



}

}

        const inValidEmailSet = new Set(["gmail.com", "hotmail.com", "yahoo.com"]);

        function isValidEmail(email) {

            if (email.toLowerCase().includes("gmail.com") || email.toLowerCase().includes("hotmail.com") || email.toLowerCase().includes("yahoo.com")) {
                return false;
            } else {
                return true;
            }
        }