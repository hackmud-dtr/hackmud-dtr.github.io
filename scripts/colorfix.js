var COLORS={ // taken from shell.txt output
	"A":"#FFFFFF",	"a":"#000000",
	"B":"#CACACA",	"b":"#3F3F3F",
	"C":"#9B9B9B",	"c":"#676767",
	"D":"#FF0000",	"d":"#7D0000",
	"E":"#FF8383",	"e":"#8E3434",
	"F":"#FF8000",	"f":"#A34F00",
	"G":"#F3AA6F",	"g":"#725437",
	"H":"#FBC803",	"h":"#A88600",
	"I":"#FFD863",	"i":"#B2934A",
	"J":"#FFF404",	"j":"#939500",
	"K":"#F3F998",	"k":"#495225",
	"L":"#1EFF00",	"l":"#299400",
	"M":"#B3FF9B",	"m":"#23381B",
	"N":"#00FFFF",	"n":"#00535B",
	"O":"#8FE6FF",	"o":"#324A4C",
	"P":"#0070DD",	"p":"#0073A6",
	"Q":"#A4E3FF",	"q":"#385A6C",
	"R":"#0000FF",	"r":"#010067",
	"S":"#7AB2F4",	"s":"#507AA1",
	"T":"#B035EE",	"t":"#601C81",
	"U":"#E6C4FF",	"u":"#43314C",
	"V":"#FF00EC",	"v":"#8C0069",
	"W":"#FF96E0",	"w":"#973984",
	"X":"#FF0070",	"x":"#880024",
	"Y":"#FF6A98",	"y":"#762E4A",
	"Z":"#0C112B",	"z":"#101215"
}
const NUM_EQUIV='CALPTFFFFF'
for(var i=0;i<NUM_EQUIV.length;++i) {
	COLORS[i]=COLORS[NUM_EQUIV[i]]
}

var COLOR_REGEXES={ // mostly taken from decompiled client and cleaned up a little, a few small changes made to simplify but not a ton
	startCurrencyRegex  :  /^(-)?(?:(\d{1,5})Q)?(?:(\d{1,3})T)?(?:(\d{1,3})B)?(?:(\d{1,3})M)?(?:(\d{1,3})K)?(?:(\d{1,3}))?GC(\W)/g,
	insideCurrencyRegex : /(\W)(-)?(?:(\d{1,5})Q)?(?:(\d{1,3})T)?(?:(\d{1,3})B)?(?:(\d{1,3})M)?(?:(\d{1,3})K)?(?:(\d{1,3}))?GC(\W)/g,
	dateRegex           : /(\d{1,4})AD D(\d{1,3})/g,
	trustCommunication  : /:::TRUST COMMUNICATION:::/g,
	trustScriptRegex    : /(#s\.|[^#\.a-z0-9_]|^)(trust|accts|autos|scripts|users|sys|corps|chats|gui|escrow|market|kernel|binmat)\.([a-z_][a-z0-9_]*)/g,
	scriptRegex         : /(#s\.|[^#\.a-z0-9_]|^)([a-z_][a-z0-9_]*)\.([a-z_][a-z0-9_]*)/g,
	keyValueSuggestRegex: /((?:(?:"(?:[^"\n]|\.)+")|(?:[a-zA-z_]\w*))[\t ]{0,2}):([\t ]{0,2}(?:(?:È[^É]+É)|(?:"È(?:[^"É\n]|\.)*É")))/g,
	keyValueRegex       : /((?:(?:"(?:[^"\n]|\.)+")|(?:[a-zA-z_]\w*))[\t ]{0,2}):([\t ]{0,2}(?:(?:true)|(?:false)|(?:null)|(?:"(?:[^"\n]|\.)*")|(?:-?\d+\.?\d*)|\{|\[|#s\.[a-z_][a-z0-9_]*\.[a-z_][a-z0-9_]*))/g,
	sectorRegex         : /(FORM|CHAOS|KIN|CHOICE|DATA|VOID)_(?:ALPHA|BETA|GAMMA|DELTA|EPSILON|ZETA|THETA|LAMBDA|SIGMA|TAU|PHI|PSI|OMEGA)_[0-9]/g,
	anonSectorRegex     : /(?:SPC|VNP|K|HJG|NGC)_[0-9]{4}/g,
	colorMapRegex       : /`([0-9a-zA-Z])([^:`\n]{1,2}|[^`\n]{3,}?)`/g,
	usernameRegex       : /@([a-z_][a-z0-9_]*)/g
}

var fs=require('fs')

var a=fs.readFileSync(process.argv[2]).toString()

var ct=0;

a=a.replace(/(?:`A)?>>`?(.*)/g,(_,l)=>'<span style="color:#FFFFFF" id="output-'+(ct++).toString(16).padStart(2,0)+'">&gt;&gt;'+l+'</span>') //'//syntax


a=a.split('\n');

var USERS={}
var USER_COLORS='JWLBKM' // the colors for @-usernames, in order
var user_ct=0;

function getUsernameColor(user) {
	if(!USERS[user])
		USERS[user]=USER_COLORS[user_ct++%USER_COLORS.lenth];
	return USERS[user];

}

function span(color,contents) {
	return '<span style="color:'+COLORS[color]+'">'+contents+'</span>'
}
for(var i=0;i<a.length;++i) {
	var line=a[i];
	if(!line.trim())continue;

	line=line.replace(COLOR_REGEXES.startCurrencyRegex,(_,n,q,t,b,m,k,gc,ws)=>{
		var r=''
		if(n)r+=span('S',n)
		if(q)r+=span('B',q)+span('D','Q');
		if(t)r+=span('B',t)+span('V','T');
		if(b)r+=span('B',b)+span('J','B');
		if(m)r+=span('B',m)+span('L','M');
		if(k)r+=span('B',k)+span('N','K');
		if(gc)r+=span('B',gc)
		r+=span('C','GC')
		r+=ws;

		return r;
	})
	line=line.replace(COLOR_REGEXES.insideCurrencyRegex,(_,w1,n,q,t,b,m,k,gc,w2)=>{
		var r=w1
		if(n)r+=span('S',n)
		if(q)r+=span('B',q)+span('D','Q');
		if(t)r+=span('B',t)+span('V','T');
		if(b)r+=span('B',b)+span('J','B');
		if(m)r+=span('B',m)+span('L','M');
		if(k)r+=span('B',k)+span('N','K');
		if(gc)r+=span('B',gc)
		r+=span('C','GC')
		r+=w2;

		return r;
	})

	line=line.replace(COLOR_REGEXES.dateRegex,(_,y,d)=>span('A',y)+span('B','AD')+' '+span('C','D')+span('L',d))

	line=line.replace(COLOR_REGEXES.trustCommunication,span('D','$1'))

	line=line.replace(COLOR_REGEXES.trustScriptRegex,(_,pre,user,script)=>pre+span('F',user)+'.'+span('L',script))
	line=line.replace(COLOR_REGEXES.scriptRegex,(_,pre,user,script)=>pre+span('C',user)+'.'+span('L',script))

	line=line.replace(COLOR_REGEXES.keyValueSuggestRegex,(_,k,v)=>span('N',k)+':'+span('B',v))
	line=line.replace(COLOR_REGEXES.keyValueRegex,(_,k,v)=>span('N',k)+':'+span('V',v))

	line=line.replace(COLOR_REGEXES.sectorRegex,(all,a)=>span({FORM:'l',KIN:'N',VOID:'I',DATA:'q',CHOICE:'F',CHAOS:'D'}[a],all))
	line=line.replace(COLOR_REGEXES.anonSectorRegex,all=>span('C',all))

	line=line.replace(COLOR_REGEXES.colorMapRegex,(_,C,c)=>span(C,c))

	line=line.replace(COLOR_REGEXES.usernameRegex,(_,u)=>span('B','@')+span(getUsernameColor(user),user))


	a[i]=line;
}
a=a.join('\n')
var HEAD=`<!DOCTYPE html>
<html>
<head>
<title>TITLE</title>
<meta charset="UTF-8">
<link rel="stylesheet" href="./hackmud.css">
<script>
function fixRisk() {
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
</script>
</head>
<body onload='fixRisk()'>
`
fs.writeFileSync(process.argv[2].replace(/\.html/g,'_col.html'),HEAD.replace(/TITLE/g,process.argv[3])+a.trim()+'\n</body>\n</html>\n')

