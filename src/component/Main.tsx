import React, { useState } from "react";
import Fire from "./Fire";
import Setting from "./Setting";

function Main() {
	const [MaxParticles, setMaxParticles] = useState<number>(150);
	const [Filter, setFilter] = useState<string>("normal");


	return (
		<>
			<Fire MaxParticles={MaxParticles} Filter={Filter} />
			<Setting MaxParticles={MaxParticles} setMaxParticles={setMaxParticles} Filter={Filter} setFilter={setFilter} />
		</>
	)
}

export default Main;