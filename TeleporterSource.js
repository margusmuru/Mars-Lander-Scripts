#pragma strict
var Lander:GameObject;
var Destination:GameObject;
var SmokeEffect:GameObject;
function Start () 
{
	//Lander=GameObject.FindWithTag("Lander").GetComponent(GameObject); 
	//Destination=GameObject.FindWithTag("TeleporterDestination").GetComponent(GameObject); 
}

function Update () 
{
	
}
function OnCollisionEnter(hitInfo:Collision)
{
	if(hitInfo.gameObject.tag=="Lander")
	{
		Instantiate(SmokeEffect,transform.position,transform.rotation);
		yield WaitForSeconds(1);
		Lander.SetActive(false);
		Lander.transform.position.x=Destination.transform.position.x;
		Lander.transform.position.y=Destination.transform.position.y-1;
		yield WaitForSeconds(1);
		Instantiate(SmokeEffect,Destination.transform.position,transform.rotation);
		Lander.SetActive(true);
	}
}