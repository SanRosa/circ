class Circunference {

	constructor(h, k, radius) {
		this.h = h;
		this.k = k;
		this.radius = radius;
		this.C = -2 * h;
		this.D = -2 * k;
		this.F = Math.pow(h, 2) + Math.pow(k, 2) - Math.pow(radius, 2);
	}

	getCenter(){
		return "(" + this.h + ", " + this.k + ")";
	}

	getRadius(){
		return this.radius;
	}

	toStringOrdinaryLatex() {
		let xTerms = "(x-" + this.h + ")^{2}";
		let yTerms = "(y-" + this.k + ")^{2}";
		if(this.h === 0) {
			xTerms = "x^{2}";
		}
		if(this.k === 0) {
			yTerms= "y^{2}";
		}
		return (xTerms + "+" + yTerms + "=" + Math.pow(this.radius, 2)).replace(/\-\-/g, "+");
	}

	toStringGeneralLatex() {
		let xTerms = this.C + "x+";
		let yTerms = this.D + "y+";
		if(this.C === 0) {
			xTerms = "";
		}
		if(this.D === 0) {
			yTerms = "";
		}
		return ("x^{2}+y^{2}+" + xTerms + yTerms + this.F.toString() + "=0").replace(/\+\-/g, "-");
	}

	generalToOrdinaryLatexStrings() {
		return [
			this.toStringGeneralLatex(),
			this.intermediateSteps(),
			this.toStringOrdinaryLatex()
		]
	}

	intermediateSteps() {
		let xTerms = "x^{2}+" + this.C + "x+\\mathbf{" + Math.pow(this.C / 2, 2) + "}+";
		let yTerms = "y^{2}+" + this.D + "y+\\mathbf{" + Math.pow(this.D / 2, 2) + "}";
		let rightHandSide = - this.F + "+\\mathbf{" + Math.pow(this.C / 2, 2) + "}+\\mathbf{" + Math.pow(this.D / 2, 2) + "}";
		if(this.C === 0){
			xTerms = "x^{2}+";
		}
		if(this.D === 0){
			yTerms = "y^{2}";
		}
		return (xTerms + yTerms + "=" + rightHandSide).replace(/\+\-/g, "-");
	}

}

let randomX = -10 + Math.round(Math.random() * 20);
let randomY = -10 + Math.round(Math.random() * 20);
let randomRadius = 1 + Math.round(Math.random() * 15);

let myCirc = new Circunference(randomX, randomY, randomRadius);

let mainContainer = document.getElementsByClassName("container")[0];

let cardBody = document.getElementsByClassName("card-body")[0];

let questionDiv = document.getElementsByClassName("questionDiv")[0];
let questionPara = document.createElement("p");
let questionNode = document.createTextNode("Determina la forma ordinaria y grafica:");
questionPara.appendChild(questionNode);
questionNode = document.createTextNode("\\[" + myCirc.toStringGeneralLatex() + "\\]");
questionPara.appendChild(questionNode);
questionDiv.appendChild(questionPara);

let div = document.createElement("div");

for(let i = 0; i < myCirc.generalToOrdinaryLatexStrings().length; i++){
	let information = document.createTextNode("\\[" + myCirc.generalToOrdinaryLatexStrings()[i] + "\\]");
	div.appendChild(information);
}
information = document.createTextNode("\\[ \\text{Centro: }" + myCirc.getCenter() + "\\]");
div.appendChild(information);
information = document.createTextNode("\\[ \\text{Radio: } \\sqrt{" + Math.pow(myCirc.getRadius(),2) + "} =" + myCirc.getRadius() + "\\]");
div.appendChild(information);

let desmosDiv = document.createElement("div");
desmosDiv.id = "calculator";
desmosDiv.style.width = "80vw";
desmosDiv.style.height = "400px";
div.appendChild(desmosDiv);
mainContainer.appendChild(div);

cardBody.appendChild(div);

var elt = document.getElementById('calculator');
var calculator = Desmos.GraphingCalculator(elt);
calculator.setExpression({ id: 'graph1', latex: myCirc.toStringGeneralLatex() });
calculator.setExpression({ id: 'graph2', latex: myCirc.getCenter() });
calculator.setExpression({ id: 'graph3', latex: '"radio"=' + myCirc.getRadius() });
calculator.setExpression({ id: 'graph4', latex: myCirc.toStringOrdinaryLatex(), hidden:true });

