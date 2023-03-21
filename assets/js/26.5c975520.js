(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{307:function(t,s,a){"use strict";a.r(s);var n=a(10),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"page-title"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#page-title"}},[t._v("#")]),t._v(" "+t._s(t.$page.title))]),t._v(" "),s("p",[s("span",{staticStyle:{color:"#999"}},[t._v(t._s(t.$page.readingTime.text)+"...")])]),t._v(" "),s("h2",{attrs:{id:"msticpyとは"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#msticpyとは"}},[t._v("#")]),t._v(" msticpyとは")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://github.com/microsoft/msticpy",target:"_blank",rel:"noopener noreferrer"}},[t._v("msticpy"),s("OutboundLink")],1),t._v("(Microsoft Threat Intelligence Python Security Tools)はMicrosoftが開発しているOSSです。")]),t._v(" "),s("p",[t._v("具体的にどんなものかというと、Jupyter Notebookにthreat hunting/investigationをするための機能を追加したツールとなります。")]),t._v(" "),s("p",[t._v("msticpyが持つ主な機能は以下の3つです。")]),t._v(" "),s("ul",[s("li",[t._v("sectools - Python security tools to help with data enrichment, analysis or investigation.")]),t._v(" "),s("li",[t._v("nbtools - Jupyter-specific UI tools such as widgets, plotting and other data display.")]),t._v(" "),s("li",[t._v("data - data layer and pre-defined queries for Azure Sentinel, MDATP and other data sources.")])]),t._v(" "),s("p",[t._v("この記事では、msticpyの入門編としてsectools(iocextract & geoip)及びnbtools(foliummap)の機能を使ってIPのジオローケーションデータをマッピングするやり方を紹介します。")]),t._v(" "),s("h2",{attrs:{id:"インストール"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#インストール"}},[t._v("#")]),t._v(" インストール")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("pip "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" msticpy\n")])])]),s("h2",{attrs:{id:"設定"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#設定"}},[t._v("#")]),t._v(" 設定")]),t._v(" "),s("p",[t._v("IPのジオロケーションデータを取得するために、今回は"),s("a",{attrs:{href:"https://www.maxmind.com/en/home",target:"_blank",rel:"noopener noreferrer"}},[t._v("MaxMind"),s("OutboundLink")],1),t._v("のデータベースを使用します。")]),t._v(" "),s("p",[t._v("MaxMindのアカウントを作成し、トークンを"),s("code",[t._v("MAXMIND_AUTH")]),t._v("という名前の環境変数に設定してください。その後、下記の内容の"),s("code",[t._v("msticpyconfig.yaml")]),t._v("を作成してください。")]),t._v(" "),s("div",{staticClass:"language-yaml extra-class"},[s("pre",{pre:!0,attrs:{class:"language-yaml"}},[s("code",[s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("OtherProviders")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("GeoIPLite")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("Args")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("AuthKey")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("EnvironmentVar")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"MAXMIND_AUTH"')]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("DBFolder")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"~/.msticpy"')]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("Provider")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"GeoLiteLookup"')]),t._v("\n")])])]),s("p",[t._v("これで設定完了です。")]),t._v(" "),s("h2",{attrs:{id:"ノートブックの作成"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#ノートブックの作成"}},[t._v("#")]),t._v(" ノートブックの作成")]),t._v(" "),s("p",[t._v("今回は例として下記のフィードからIPを抽出してマッピングしてみます。")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://feodotracker.abuse.ch/downloads/ipblocklist.csv%5D",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://feodotracker.abuse.ch/downloads/ipblocklist.csv"),s("OutboundLink")],1)])]),t._v(" "),s("p",[t._v("Jupyter Notebookを起動し、新しいノートブックを作成してください。")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("jupyter notebook\n")])])]),s("h3",{attrs:{id:"ipv4の抽出"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#ipv4の抽出"}},[t._v("#")]),t._v(" IPv4の抽出")]),t._v(" "),s("div",{staticClass:"language-python extra-class"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" IPython"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("display "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" display\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" msticpy"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("nbtools"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("foliummap "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" FoliumMap\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" msticpy"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("sectools "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" IoCExtract\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" msticpy"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("sectools"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("geoip "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" GeoLiteLookup\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" requests\n\nurl "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://feodotracker.abuse.ch/downloads/ipblocklist.csv"')]),t._v("\n\nres "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" requests"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("get"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("url"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\ntext "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" res"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("text\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Extract IPv4s from the text")]),t._v("\nioc_extractor "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" IoCExtract"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\niocs_found "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" ioc_extractor"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("extract"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("text"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nip_addr_list "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" iocs_found"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("get"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"ipv4"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("print")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ip_addr_list"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("p",[s("img",{attrs:{src:"https://i.imgur.com/O1yd1Sd.png",alt:""}})]),t._v(" "),s("p",[t._v("抽出したIPアドレスのジオロケーションデータをルックアップし、マッピングします。")]),t._v(" "),s("div",{staticClass:"language-python extra-class"},[s("pre",{pre:!0,attrs:{class:"language-python"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Lookup gelocations")]),t._v("\niplocation "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" GeoLiteLookup"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nloc_results"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" ip_entries "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" iplocation"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("lookup_ip"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ip_addr_list"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("ip_addr_list"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\nfolium_map "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" FoliumMap"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Set Icon properties to display")]),t._v("\nicon_props "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"color"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"red"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Add the IP set to the map")]),t._v("\nfolium_map"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("add_ip_cluster"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ip_entities"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("ip_entries"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("**")]),t._v("icon_props"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Display the map (or just have folium_map")]),t._v("\ndisplay"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("folium_map"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("p",[s("img",{attrs:{src:"https://i.imgur.com/VXe1xIQ.png",alt:""}})]),t._v(" "),s("h2",{attrs:{id:"notes"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#notes"}},[t._v("#")]),t._v(" Notes")]),t._v(" "),s("p",[t._v("msticpyのIoC抽出機能はナイーブな正規表現ベースで実装されています。")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://github.com/microsoft/msticpy/blob/a1d53bffdcbfa6a633f440a3dcf7f17a04ebd4c1/msticpy/sectools/iocextract.py#L119-L147",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/microsoft/msticpy/blob/a1d53bffdcbfa6a633f440a3dcf7f17a04ebd4c1/msticpy/sectools/iocextract.py#L119-L147"),s("OutboundLink")],1)])]),t._v(" "),s("p",[t._v("このため、例えば下記のような文字列からはIoCを抽出できませんので注意が必要です。")]),t._v(" "),s("p",[s("code",[t._v("1.1.1[.]1 example[.]com")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://i.imgur.com/AWpmn4W.png",alt:""}})])])}),[],!1,null,null,null);s.default=e.exports}}]);