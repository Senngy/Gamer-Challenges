<!-- FilterText.svelte -->
<script>

    // Décoder les entités HTML en node/svelte sans DOM (node compatible)
   function decodeHtmlEntities(text) {
       return text.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
   }

    // Supprimer les balises HTML d'une chaîne de caractères
    function stripHtmlTags(text) {
       return text.replace(/<[^>]*>/g, '');
    }

    const { text = '', max = 200 } = $props(); // Récupération des propriétés passées au composant, avec des valeurs par défaut
    const displayText = $derived.by(() => {

        const decoded = decodeHtmlEntities(text);
        
        const cleanText = stripHtmlTags(decoded);

        return cleanText.length > max ? cleanText.slice(0, max) + '...' : text;
    });
</script>

<span>{displayText}</span>