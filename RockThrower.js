#pragma strict

var rockObject:Rigidbody;

InvokeRepeating("throwRock", 2, 1.5); //("funktsiooni nimi",aega käivituseni,intervall)

function throwRock()
{
	var clone:Rigidbody;
	clone=Instantiate(rockObject,transform.position,transform.rotation);
	clone.velocity = transform.TransformDirection(Vector3(Random.Range(-5,5),Random.Range(0,5),0) * 1.5);
}