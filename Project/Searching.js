function validate(){
    var searchtitle = document.getElementById("searching").value;
    if (searchtitle == "Harry Potter and the Sorcerer's Stone"){
        alert("Search Successfully");
        window.location="file:///E:/BACHELOR-2/SE-2019/Final_Project/Project/HP1.html";
        return false;
    }
    else {
        if (searchtitle == "Hac the old man"){
            alert("Search Successfully");
            window.location="file:///E:/BACHELOR-2/SE-2019/Final_Project/Project/LaoHac.html";
            return false;
        }
        else {
            if (searchtitle == "Harry Potter and the Chamber of Secrets"){
                alert("Search Successfully");
                window.location="file:///E:/BACHELOR-2/SE-2019/Final_Project/Project/HP2.html";
                return false;
            }
            else { 
                alert("Can't find!");
                return false;
            }
        }
    
    }

}