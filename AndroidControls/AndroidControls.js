#pragma strict

var lander:PlayerController;
//variables
public var leftArrowPressed:boolean=false;
public var rightArrowPressed:boolean=false;
public var upArrowPressed:boolean=false;
public var downArrowPressed:boolean=false;
public var FPScounter:GameObject;
function Start () 
{
	lander=GameObject.FindWithTag("Lander").GetComponent(PlayerController);
	FPScounter=GameObject.FindWithTag("FPS");
	//if(PlayerPrefs.GetInt("DevMode")){FPScounter.SetActive(true);}else{FPScounter.SetActive(false);}
}

function Update () 
{	
	if(leftArrowPressed)
	{
		lander.moveLeft();
	}
	else if(rightArrowPressed)
	{
		lander.moveRight();
	}
	if(leftArrowPressed==false && rightArrowPressed==false)
	{
		lander.verticalStop();
	}
	
	if(upArrowPressed)
	{
		lander.moveUp();
	}
	else if(downArrowPressed)
	{
		lander.moveDown();
	}
	if(upArrowPressed==false && downArrowPressed==false)
	{
		lander.horizontalStop();
	}	
}
