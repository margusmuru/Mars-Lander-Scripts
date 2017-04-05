#pragma strict

function Start () {

}

function Update () {

}
function OnCollisionEnter(hitInfo:Collision)
{
	if(hitInfo.gameObject.tag=="Lander")
	{
		audio.Play();
		GetComponent(BoxCollider).enabled=false;
		GetComponent(MeshRenderer).enabled=false;		
		yield WaitForSeconds(2);
		Destroy(gameObject);		
	}
}