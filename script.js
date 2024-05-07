var selectedIndex = -1;

function save() {
    var name = document.getElementById('name').value 
    var mobile = document.getElementById('mobile').value 
    var email = document.getElementById('email').value 

    var btn = document.getElementById('btn').value
    if(btn == "ADD")
        {
            var new_contact = {
                "name": name,
                "mobile" :mobile,
                "email" :email
            }
        
            if(localStorage.getItem('mycontacts'))
            {
                var mycontacts = JSON.parse(localStorage.getItem('mycontacts'))
                mycontacts.push(new_contact);
                localStorage.setItem('mycontacts', JSON.stringify(mycontacts));
            }
            else{
                var mycontacts = []
                mycontacts.push(new_contact);
                localStorage.setItem('mycontacts', JSON.stringify(mycontacts));
            }
            document.getElementById('result').innerHTML = "Contact added"
        }
        else{
            var mycontacts = JSON.parse(localStorage.getItem('mycontacts'))
            mycontacts[selectedIndex].name=name
            mycontacts[selectedIndex].mobile=mobile
            mycontacts[selectedIndex].email=email
    
            localStorage.setItem('mycontacts', JSON.stringify(mycontacts));
    
            alert("Data updated")
    
            document.getElementById('btn').value = "ADD"
        }

    document.getElementById('name').value = ""
    document.getElementById('mobile').value = ""
    document.getElementById('email').value = ""

    display()
}

function display(){
    if(localStorage.getItem('mycontacts'))
    {
        var mycontacts = JSON.parse(localStorage.getItem('mycontacts'))
        
        var temp = "<table id='space'>";
        temp += "<tr>"
        temp += "<td>Name</td>";
        temp += "<td>Mobile</td>";
        temp += "<td>Email Id</td>";
        temp += "<th colspan='2'>Action</th>";
        temp += "</tr>"
        for(i=0; i<mycontacts.length; i++)
        {
            temp += "<tr>";
            temp += "<td>"+mycontacts[i].name+"</td>";
            temp += "<td>"+mycontacts[i].mobile+"</td>";
            temp += "<td>"+mycontacts[i].email+"</td>";

            temp += "<td><button onclick='editContact("+i+")'>Edit</button></td>";
            temp += "<td><button onclick='deleteContact("+i+")'>Delete</button></td>";
            temp += "</tr>";
        }
        temp += "</table>";
        document.getElementById('list').innerHTML = temp;
    }
    else{
        document.getElementById('list').innerHTML = "There are no contacts";
    }
}



function editContact(index){
    selectedIndex = index;
    var mycontacts = JSON.parse(localStorage.getItem('mycontacts'))

    document.getElementById('name').value = mycontacts[index].name;
    document.getElementById('mobile').value = mycontacts[index].mobile;
    document.getElementById('email').value = mycontacts[index].email;

    document.getElementById('btn').value="UPDATE";
}

function deleteContact(index){
   if(confirm("Are u sure to delete? "))
    {
        var mycontacts = JSON.parse(localStorage.getItem('mycontacts'));
        var newContacts = [];
        for(i=0;i<mycontacts.length;i++)
        {
            if(i!= index){
                newContacts.push(mycontacts[i]);
            }
        }
        localStorage.setItem('mycontacts', JSON.stringify(newContacts));
        // alert(`deleted`);
        display();
    }
}







