#pragma strict
function Start () 
{
	yield WaitForSeconds(5);
	Destroy(gameObject);
}
function OnCollisionEnter(hitInfo:Collision)
{
	if(hitInfo.gameObject.tag == "HoverCraftPad")
	{
		Destroy(gameObject);
	}
}