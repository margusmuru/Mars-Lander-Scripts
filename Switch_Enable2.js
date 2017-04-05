#pragma strict
var object1:GameObject;
var object2:GameObject;

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
		object1.SetActive(true);	
		object2.SetActive(true);	
		rotate=false;	
		enableObject=true;
		lightObject.color=Color.green;
	}
	else if(hitInfo.gameObject.tag=="Lander" && enableObject==true)
	{
		rotate=true;
		yield WaitForSeconds(1);
		object1.SetActive(false);
		object2.SetActive(false);	
		rotate=false;	
		enableObject=false;
		lightObject.color=Color.red;
	}
}