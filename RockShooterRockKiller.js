#pragma strict
//var rockObject:Rigidbody;

function Start () 
{
	yield WaitForSeconds(5);
	Destroy(gameObject);
}

function OnCollisionEnter(hitInfo:Collision)
	{
		if(hitInfo.relativeVelocity.magnitude>1 && hitInfo.gameObject.tag!="RockShooterCollider")
		{
//			var clone:Rigidbody;
//			for(var i=0;i<4;i++)
//			{
//				clone=Instantiate(rockObject,transform.position,transform.rotation);
//				clone.velocity = gameObject.transform.TransformDirection(Vector3(Random.Range(-3,3),Random.Range(-3,3),0) * 1.5);
//			}
			Destroy(gameObject);
		}
	}