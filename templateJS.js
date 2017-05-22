function addTopHeading(){
	var element = document.getElementById("topHeading");
		element.innerHTML = "Elijah Greene"; 				//Change name here
		element.style.fontSize = "40pt";					//Change fontSize here
}


function addLinks(){
	
	var links = [											//Add more link items here
		{text: "Home", link: "Home.html"},
		{text: "Racing", link: "Racing.html"},
		{text: "Lucas", link: "Lucas.html"}
	];
	
	var tableText = "<tr>";
	
	for(var i = 0; i < links.length; i = i+1){
		tableText = tableText + '<td><a href="'+links[i].link+'"> ' + links[i].text + '</a></td>';
		
		if(i !== links.length - 1){
			tableText = tableText + "<td>|</td>";
		}
	}
	
	tableText = tableText + "</tr>";
	
	document.getElementById("menu").innerHTML = tableText;
}

function addFooter(){
	document.writeln("<hr>");
	document.writeln("<p>Developed using HTML, CSS, and JavaScript<br/>");
	document.writeln("By Elijah Greene</p>");
	//social media image
	document.writeln('<img src="SocialMedia.jpg" alt="Social Media Logos" style="height: 40px; width: 170px" usemap="#social"/>');
	//social media image map
	document.writeln('<map name="social">');
		document.writeln('<area shape="circle" coords="22,18,18" href="https://www.facebook.com/egreene017" alt="facebook">');
		document.writeln('<area shape="circle" coords="61,18,18" href="https://www.instagram.com/egreene017/" alt="instagram">');
		document.writeln('<area shape="circle" coords="102,18,18" href="https://www.linkedin.com/in/elijah-greene-18714511a/" alt="linkedin">');
		document.writeln('<area shape="circle" coords="145,18,18" href="mailto:egreene017@gmail.com" alt="gmail">');
	document.writeln('</map>');
}