function fixRisk() { // add spooky shadow effect to risk text
	if(document.location.search=='?risk'){
		[...document.all].forEach(x=>{
			if(x.style.color=='rgb(0, 0, 0)')
				x.style.textShadow='0px 0px 5px white'
		});

		[...document.getElementsByTagName('a')].forEach(x=>{
			if(x.href)
				x.href+='?risk'
		})
	}
}

function createFooter(){ // create page footer
	let footer_txt = `<hr>
<p>Created by <a style="color:#FF96E0" href="https://github.com/hackmud-dtr">dtr</a>, maintained by <a style="color:#0073A6" href="https://github.com/matr1x-hackmud">matr1x</a>

<a style="color:#FFFFFF" href="https://hackmud.com">hackmud.com</a> | <a style="color:#FFFFFF" href="https://discord.gg/3wegMtb">discord</a>
</p>`

console.log("footing")
let footer = document.getElementById("global-footer")
if(footer){
	console.log("footered")
	footer.innerHTML = footer_txt;
	footer.className = "global-footer-filled";
}


}