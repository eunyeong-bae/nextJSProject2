export default function weatherAPI(request, response) {
    const today = new Date();
    return response.status(200).json(today)
}