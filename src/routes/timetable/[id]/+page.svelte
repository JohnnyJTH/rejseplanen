<script>
	export let data;
</script>

<div class="container">
    
    <div class="accordion accordion-flush p-12" id="departureAccordion">
        <div class="accordion-item">
            <h2 class="accordion-header" id="headerStog">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseStog" aria-expanded="true" aria-controls="collapseStog">
                    S-tog
                  </button>            
            </h2>
            <div id="collapseStog" class="accordion-collapse collapse show" aria-labelledby="headerStog" data-bs-parent="#departureAccordion">
                <div class="accordion-body">
                    {#each data["stog"] as departure}
                        <strong>{departure["name"]}</strong>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</div>
