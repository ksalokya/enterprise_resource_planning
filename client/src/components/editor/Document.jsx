import { useState, useEffect } from "react";
import {
    DocumentEditorContainerComponent,
    Toolbar,
} from '@syncfusion/ej2-react-documenteditor';
import Header from '../header/Header'
import useMediaQuery from '@mui/material/useMediaQuery';
import './document.css'

DocumentEditorContainerComponent.Inject(Toolbar);

function Document() {

    const matches = useMediaQuery('(max-width:900px)');
    const [displayPropertiesPane, setDisplayPropertiesPane] = useState(true);
    useEffect(() => {
        if (matches) setDisplayPropertiesPane(false);
        else setDisplayPropertiesPane(true);
    }, [matches])


    let container;
    // send data to backend
    function onClick() {
        let obj = container;
        let http = new XMLHttpRequest();
        // Replace your running web service Url here
        http.open('POST', 'http://localhost:5000/');
        http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        http.responseType = 'json';
        //Serialize document content as SFDT.
        let sfdt = { content: obj.documentEditor.serialize() };
        //Send the sfdt content to server side.
        http.send(JSON.stringify(sfdt));
    }
    const handleCreated = e => {
        // load your default document here
        // let data = `{"sections":[{"sectionFormat":{"pageWidth":612,"pageHeight":792,"leftMargin":72,"rightMargin":72,"topMargin":72,"bottomMargin":72,"differentFirstPage":false,"differentOddAndEvenPages":false,"headerDistance":36,"footerDistance":36,"bidi":false},"blocks":[{"paragraphFormat":{"afterSpacing":30,"styleName":"Heading 1","listFormat":{}},"characterFormat":{},"inlines":[{"characterFormat":{},"text":"Adventure Works Cycles"}]}],"headersFooters":{"header":{"blocks":[{"paragraphFormat":{"listFormat":{}},"characterFormat":{},"inlines":[]}]},"footer":{"blocks":[{"paragraphFormat":{"listFormat":{}},"characterFormat":{},"inlines":[]}]}}}],"characterFormat":{"bold":false,"italic":false,"fontSize":11,"fontFamily":"Calibri","underline":"None","strikethrough":"None","baselineAlignment":"Normal","highlightColor":"NoColor","fontColor":"empty","fontSizeBidi":11,"fontFamilyBidi":"Calibri","allCaps":false},"paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":0,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","listFormat":{},"bidi":false},"defaultTabWidth":36,"trackChanges":false,"enforcement":false,"hashValue":"","saltValue":"","formatting":false,"protectionType":"NoProtection","dontUseHTMLParagraphAutoSpacing":false,"formFieldShading":true,"styles":[{"name":"Normal","type":"Paragraph","paragraphFormat":{"lineSpacing":1.149999976158142,"lineSpacingType":"Multiple","listFormat":{}},"characterFormat":{"fontFamily":"Calibri"},"next":"Normal"},{"name":"Default Paragraph Font","type":"Character","characterFormat":{}},{"name":"Heading 1 Char","type":"Character","characterFormat":{"fontSize":16,"fontFamily":"Calibri Light","fontColor":"#2F5496"},"basedOn":"Default Paragraph Font"},{"name":"Heading 1","type":"Paragraph","paragraphFormat":{"beforeSpacing":12,"afterSpacing":0,"outlineLevel":"Level1","listFormat":{}},"characterFormat":{"fontSize":16,"fontFamily":"Calibri Light","fontColor":"#2F5496"},"basedOn":"Normal","link":"Heading 1 Char","next":"Normal"},{"name":"Heading 2 Char","type":"Character","characterFormat":{"fontSize":13,"fontFamily":"Calibri Light","fontColor":"#2F5496"},"basedOn":"Default Paragraph Font"},{"name":"Heading 2","type":"Paragraph","paragraphFormat":{"beforeSpacing":2,"afterSpacing":6,"outlineLevel":"Level2","listFormat":{}},"characterFormat":{"fontSize":13,"fontFamily":"Calibri Light","fontColor":"#2F5496"},"basedOn":"Normal","link":"Heading 2 Char","next":"Normal"},{"name":"Heading 3","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level3","listFormat":{}},"characterFormat":{"fontSize":12,"fontFamily":"Calibri Light","fontColor":"#1F3763"},"basedOn":"Normal","link":"Heading 3 Char","next":"Normal"},{"name":"Heading 3 Char","type":"Character","characterFormat":{"fontSize":12,"fontFamily":"Calibri Light","fontColor":"#1F3763"},"basedOn":"Default Paragraph Font"},{"name":"Heading 4","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level4","listFormat":{}},"characterFormat":{"italic":true,"fontFamily":"Calibri Light","fontColor":"#2F5496"},"basedOn":"Normal","link":"Heading 4 Char","next":"Normal"},{"name":"Heading 4 Char","type":"Character","characterFormat":{"italic":true,"fontFamily":"Calibri Light","fontColor":"#2F5496"},"basedOn":"Default Paragraph Font"},{"name":"Heading 5","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level5","listFormat":{}},"characterFormat":{"fontFamily":"Calibri Light","fontColor":"#2F5496"},"basedOn":"Normal","link":"Heading 5 Char","next":"Normal"},{"name":"Heading 5 Char","type":"Character","characterFormat":{"fontFamily":"Calibri Light","fontColor":"#2F5496"},"basedOn":"Default Paragraph Font"},{"name":"Heading 6","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level6","listFormat":{}},"characterFormat":{"fontFamily":"Calibri Light","fontColor":"#1F3763"},"basedOn":"Normal","link":"Heading 6 Char","next":"Normal"},{"name":"Heading 6 Char","type":"Character","characterFormat":{"fontFamily":"Calibri Light","fontColor":"#1F3763"},"basedOn":"Default Paragraph Font"}],"lists":[],"abstractLists":[],"comments":[],"revisions":[],"customXml":[]}`;
        // Open the default document
        let data = `{"optimizeSfdt":true,"sec":[{"secpr":{"pw":612,"ph":792,"lm":72,"rm":72,"tm":72,"bm":72,"dfp":0,"doep":0,"hd":36,"fd":36,"bi":0,"bc":"NewPage","pgns":"Arabic","ncols":1,"eqw":1,"lbtc":0,"cols":[]},"b":[{"pf":{"bdrs":{"tp":{},"lt":{},"rg":{},"bt":{},"h":{},"v":{}},"stn":"Normal","lif":{}},"cf":{},"i":[{"cf":{"bi":false},"tlp":"Hello World!"}]}],"hf":{}}],"cf":{"b":false,"i":false,"fsz":11,"ff":"Calibri","u":0,"st":0,"ba":0,"hc":0,"fc":"#00000000","bbi":false,"ibi":false,"fszbi":11,"ffbi":"Calibri","ac":false,"ffa":"Calibri","ffnfe":"Calibri","fffe":"Calibri"},"pf":{"bdrs":{"tp":{},"lt":{},"rg":{},"bt":{},"h":{},"v":{}},"lin":0,"rin":0,"fin":0,"ta":0,"bs":0,"as":0,"ls":1,"lst":0,"lif":{},"bi":false,"klt":false,"kwn":false,"wc":true},"tfl":{},"dtw":36,"tc":0,"enf":0,"hv":"","sv":"","fmt":0,"pt":0,"dhtml":0,"ffs":1,"comp":0,"stytbl":0,"sty":[{"n":"Normal","t":0,"pf":{"bdrs":{"tp":{},"lt":{},"rg":{},"bt":{},"h":{},"v":{}},"lif":{}},"cf":{},"nx":"Normal"},{"n":"Heading 1","t":0,"pf":{"bdrs":{"tp":{},"lt":{},"rg":{},"bt":{},"h":{},"v":{}},"lin":0,"rin":0,"fin":0,"ta":0,"bs":12,"as":0,"ls":1.0791666507720947,"lst":0,"ol":1,"lif":{}},"cf":{"fsz":16,"ff":"Calibri Light","fc":"#2F5496","fszbi":16,"ffa":"Calibri Light","ffnfe":"Calibri Light","fffe":"Calibri Light"},"b":"Normal","l":"Heading 1 Char","nx":"Normal"},{"n":"Heading 1 Char","t":1,"cf":{"fsz":16,"ff":"Calibri Light","fc":"#2F5496","fszbi":16,"ffa":"Calibri Light","ffnfe":"Calibri Light","fffe":"Calibri Light"},"b":"Default Paragraph Font"},{"n":"Default Paragraph Font","t":1,"cf":{}},{"n":"Heading 2","t":0,"pf":{"bdrs":{"tp":{},"lt":{},"rg":{},"bt":{},"h":{},"v":{}},"lin":0,"rin":0,"fin":0,"ta":0,"bs":2,"as":0,"ls":1.0791666507720947,"lst":0,"ol":2,"lif":{}},"cf":{"fsz":13,"ff":"Calibri Light","fc":"#2F5496","fszbi":13,"ffa":"Calibri Light","ffnfe":"Calibri Light","fffe":"Calibri Light"},"b":"Normal","l":"Heading 2 Char","nx":"Normal"},{"n":"Heading 2 Char","t":1,"cf":{"fsz":13,"ff":"Calibri Light","fc":"#2F5496","fszbi":13,"ffa":"Calibri Light","ffnfe":"Calibri Light","fffe":"Calibri Light"},"b":"Default Paragraph Font"},{"n":"Heading 3","t":0,"pf":{"bdrs":{"tp":{},"lt":{},"rg":{},"bt":{},"h":{},"v":{}},"lin":0,"rin":0,"fin":0,"ta":0,"bs":2,"as":0,"ls":1.0791666507720947,"lst":0,"ol":3,"lif":{}},"cf":{"fsz":12,"ff":"Calibri Light","fc":"#1F3763","fszbi":12,"ffa":"Calibri Light","ffnfe":"Calibri Light","fffe":"Calibri Light"},"b":"Normal","l":"Heading 3 Char","nx":"Normal"},{"n":"Heading 3 Char","t":1,"cf":{"fsz":12,"ff":"Calibri Light","fc":"#1F3763","fszbi":12,"ffa":"Calibri Light","ffnfe":"Calibri Light","fffe":"Calibri Light"},"b":"Default Paragraph Font"},{"n":"Heading 4","t":0,"pf":{"bdrs":{"tp":{},"lt":{},"rg":{},"bt":{},"h":{},"v":{}},"lin":0,"rin":0,"fin":0,"ta":0,"bs":2,"as":0,"ls":1.0791666507720947,"lst":0,"ol":4,"lif":{}},"cf":{"i":true,"ff":"Calibri Light","fc":"#2F5496","ibi":true,"ffa":"Calibri Light","ffnfe":"Calibri Light","fffe":"Calibri Light"},"b":"Normal","l":"Heading 4 Char","nx":"Normal"},{"n":"Heading 4 Char","t":1,"cf":{"i":true,"ff":"Calibri Light","fc":"#2F5496","ibi":true,"ffa":"Calibri Light","ffnfe":"Calibri Light","fffe":"Calibri Light"},"b":"Default Paragraph Font"},{"n":"Heading 5","t":0,"pf":{"bdrs":{"tp":{},"lt":{},"rg":{},"bt":{},"h":{},"v":{}},"lin":0,"rin":0,"fin":0,"ta":0,"bs":2,"as":0,"ls":1.0791666507720947,"lst":0,"ol":5,"lif":{}},"cf":{"ff":"Calibri Light","fc":"#2F5496","ffa":"Calibri Light","ffnfe":"Calibri Light","fffe":"Calibri Light"},"b":"Normal","l":"Heading 5 Char","nx":"Normal"},{"n":"Heading 5 Char","t":1,"cf":{"ff":"Calibri Light","fc":"#2F5496","ffa":"Calibri Light","ffnfe":"Calibri Light","fffe":"Calibri Light"},"b":"Default Paragraph Font"},{"n":"Heading 6","t":0,"pf":{"bdrs":{"tp":{},"lt":{},"rg":{},"bt":{},"h":{},"v":{}},"lin":0,"rin":0,"fin":0,"ta":0,"bs":2,"as":0,"ls":1.0791666507720947,"lst":0,"ol":6,"lif":{}},"cf":{"ff":"Calibri Light","fc":"#1F3763","ffa":"Calibri Light","ffnfe":"Calibri Light","fffe":"Calibri Light"},"b":"Normal","l":"Heading 6 Char","nx":"Normal"},{"n":"Heading 6 Char","t":1,"cf":{"ff":"Calibri Light","fc":"#1F3763","ffa":"Calibri Light","ffnfe":"Calibri Light","fffe":"Calibri Light"},"b":"Default Paragraph Font"}],"li":[],"al":[],"cm":[],"r":[],"cx":[],"imgs":{}}`
        container.documentEditor.open(data);
    };

    return (
        <div className='document'>
            <Header title='Editor' />
            <button id='export' onClick={onClick}>Export</button>
            <DocumentEditorContainerComponent
                height={'82%'}
                serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
                enableToolbar={true}
                showPropertiesPane={displayPropertiesPane}
                enableAutoFocus={false}
                ref={(scope) => { container = scope; }}
                created={handleCreated.bind(this)}
            />
        </div>
    )
}

export default Document