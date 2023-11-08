const basicInventoryPS1PDF = `query BasicInventoryPS1PDF($id: Int!) {
    basicInventoryPS1_PDF(id: $id) {
        status 
        message
        item
    }
}`;

export default basicInventoryPS1PDF;
