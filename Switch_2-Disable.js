#pragma strict
var objectDisabled:GameObject;
var objectEnabled:GameObject;

var switchHandle:GameObject;
var rotateSpeed:int;
var rotate:boolean=false;
var lightObject:Light;

var enableObject:boolean=false;

function Start () {

}

function Update () 
{
	if(rotate==true && enableObject==false)
	{
		switchHandle.transform.Rotate(0,0,(rotateSpeed*Time.deltaTime)*(-1));
	}
	if(rotate==true && enableObject==true)
	{
		switchHandle.transform.Rotate(0,0,rotateSpeed*Time.deltaTime);
	}
}
function OnCollisionEnter(hitInfo:Collision)
{
	if(hitInfo.gameObject.tag=="Lander" && enableObject==false)
	{
		rotate=true;
		yield WaitForSeconds(1);
		objectEnabled.SetActive(false);	
		objectDisabled.SetActive(true);	
		rotate=false;	
		enableObject=true;
		lightObject.color=Color.green;
	}
	else if(hitInfo.gameObject.tag=="Lander" && enableObject==true)
	{
		rotate=true;
		yield WaitForSeconds(1);
		objectEnabled.SetActive(true);
		objectDisabled.SetActive(false);	
		rotate=false;	
		enableObject=false;
		lightObject.color=Color.red;
	}
}