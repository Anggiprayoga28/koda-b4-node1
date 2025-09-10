const moment = require('moment');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function convertTanggal() {
    rl.question('Masukkan tanggal: ', (inputTanggal) => {
        try {
            const formatRegex = /^\d{2}-\d{2}-\d{4}$/;
            
            if (!formatRegex.test(inputTanggal)) {
                console.log("Format tanggal salah!");
                console.log("Gunakan format DD-MM-YYYY (contoh: 24-04-2015)");
                rl.close();
                return;
            }
            
            const tanggalMoment = moment(inputTanggal, 'DD-MM-YYYY', true);
            
            if (!tanggalMoment.isValid()) {
                console.log("Format tanggal salah!");
                console.log("Pastikan tanggal yang dimasukkan valid");
                rl.close();
                return;
            }
            
            const tanggalConverted = tanggalMoment.format('DD/MM/YYYY');
            
            console.log(`\nHasil konversi:`);
            console.log(`Input: ${inputTanggal}`);
            console.log(`Output: ${tanggalConverted}`);
            
        } catch (error) {
            console.log("Terjadi kesalahan:", error.message);
        }
        
        rl.close();
    });
}

convertTanggal();