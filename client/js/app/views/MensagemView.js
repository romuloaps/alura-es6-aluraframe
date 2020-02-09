class MensagemView extends View {

    template(model) {
        return `<p class="alert alert-${model.tipo}">${model.texto}</p>`;
    }
}