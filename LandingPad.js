#pragma strict

var stationLight : Light;
var onMaterial : Material;
var onColor : Color;

var isActivated:boolean=false;

var GUI : InGameGUI; //GUI object

function Start () 
{
	GUI=GameObject.FindWithTag("GUI").GetComponent(InGameGUI); 
	//adds !GUI object's script to "GUI" slot for each landingpad

}

function Update () 
{

}
function Activate() //when the Lander lands on the landingpad, called from "PlayerController.js"
{
	//print(gameObject.name+" has been activated!");
	if(!isActivated)
	{
		audio.Play();
		renderer.material = onMaterial; //changes material of the landingpad
		stationLight.color = onColor; //changes color of the light near the landingpad
		GUI.LZActivated(); //activates "LZActivated" function in "InGameGUI.js"
		isActivated=true;
		gameObject.tag="LandingPadActive";
	}
}