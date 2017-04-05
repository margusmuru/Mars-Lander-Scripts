#pragma strict

var projectileObject:Rigidbody;
var startDelay:float;
InvokeRepeating("Projectile", startDelay, 1.8); //("funktsiooni nimi",aega käivituseni,intervall)

function Projectile()
{
	var clone:Rigidbody;
	clone=Instantiate(projectileObject,transform.position,transform.rotation);
}