const cyrb53 = (str, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for(let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1  = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2  = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

function string_to_color (str) {
  let hash = cyrb53(str, "chatzdottell")
  
  let chat_cols = ["FFF404","FF96E0","B3FF9B","1EFF00"]
  console.log( Math.abs(hash) )
  
  console.log( (Math.abs(hash) % chat_cols.length) )
  
  return chat_cols[(Math.abs(hash) % chat_cols.length)]
}

function getColor(u) {
	return "#"+string_to_color(u)
	
	return {
		"robovac_tresham":"#FFF404",
		"robovac_fawkes":"#FF96E0",
		"robovac_muldrake":"#B3FF9B",
		"robovac_idp1p1":"#1EFF00"
	}[u] || "#"+string_to_color(u)
}

function prepChat(d) {
	var lines=d.innerHTML.trim().split('\n');
	lines=lines.map(line=>line.replace(/^(XXXX) ([0-9A-F]{4}) ([^ ]+) :::(.*):::$/g,(_,t,c,u,m)=>`<span style="color:#9B9B9B">${t}</span> <span style="color:#FF00EC">${c}</span> <span style="color:${getColor(u)}">${u}</span> <span style="color:#3F3F3F">:::</span>${m}<span style="color:#3F3F3F">:::</span>`))
	d.innerHTML=lines.join('\n\n')
}

function clean(args) {
	if(!args)return '';
	return ' '+args.replace(/([^ ,\{]+) *: *([^,\} ]+)/g,'<span style="color:#00FFFF">$1</span>:<span style="color:#FF00EC">$2</span>')
}

function binary(dat) {
	return dat+' <span style="color:#7D0000">[Ed note: '+dat.split(' ').map(o=>String.fromCharCode(parseInt(o,2))).join('')+']</span>'
}

function prepScript(d) {
	var lines=d.innerHTML.trim().split('\n');
	lines[0]=lines[0].replace(/^&gt;&gt;([^\.]+)\.([^\{]+) *(.*)/g,(_,u,s,a)=>`<span style="color:#FFFFFF">&gt;&gt;</span><span style="color:#9B9B9B">${u}</span>.<span style="color:#1EFF00">${s}</span>${clean(a)}`)
	d.innerHTML=lines.join('\n').replace(/[01 ]{50,}/g,binary)
}

function prep() {
	var chats=document.getElementsByClassName("chat");
	for(var i=0;i<chats.length;++i)
		prepChat(chats[i])

	var scripts=document.getElementsByClassName("script");
	for(var i=0;i<scripts.length;++i)
		prepScript(scripts[i])

	var d=Math.floor((1541872800000-Date.now())/1000);
	document.getElementById('countdown').innerHTML=d;
}