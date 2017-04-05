#pragma strict
var explosion:GameObject;
var fade:GameObject;
function Start () 
{
	yield WaitForSeconds(5);
	Instantiate(fade,transform.position,transform.rotation);
	Destroy(gameObject);
}

function OnCollisionEnter(hitInfo:Collision)
	{
		if(hitInfo.relativeVelocity.magnitude>1 && hitInfo.gameObject.tag != "DiggerCollider" && hitInfo.gameObject.tag!="RockShooterCollider")
		{
			Instantiate(explosion,transform.position,transform.rotation);
			Destroy(gameObject);
		}
	}