const readline = require('readline');
const moment = require('moment');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function convertTanggal(inputTanggal) {
    const date = moment(inputTanggal, 'DD-MM-YYYY', true);
    
    if (!date.isValid()) {
        throw new Error('Format tanggal tidak valid! Gunakan format DD-MM-YYYY');
    }
    
    return date.format('DD/MM/YYYY');
}

function askDate() {
    rl.question('Masukkan tanggal (DD-MM-YYYY): ', (input) => {
        if (input.toLowerCase() === 'keluar') {
            console.log('Selesai!');
            rl.close();
            return;
        }
        
        try {
            const result = convertTanggal(input);
            console.log(`Hasil: ${input} → ${result}\n`);
        } catch (error) {
            console.log(`Error: ${error.message}\n`);
        }
        
        askDate();
    });
}
async function main() {
    console.log('Program ini akan mengubah format tanggal menjadi DD/MM/YYYY');
    console.log('Contoh input yang diterima: 24-04-2015, 24-4-2015, 2015-04-24, dll.');
    console.log('Ketik "exit" untuk keluar\n');
    
    while (true) {
        try {
            const userInput = await getUserInput('Masukkan tanggal: ');
            
            if (userInput.toLowerCase() === 'exit') {
                console.log('Terima kasih telah menggunakan program ini!');
                break;
            }
            
            if (!userInput.trim()) {
                console.log('Input tidak boleh kosong!\n');
                continue;
            }
            
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const convertedDate = await convertDate(userInput);
            
            console.log(`Hasil konversi: ${convertedDate}`);
            console.log(`Input: ${userInput} → Output: ${convertedDate}\n`);
            
        } catch (error) {
            console.log(`${error.message}`);
            console.log('Pastikan format tanggal benar (contoh: 24-04-2015, 24/04/2015)\n');
        }
    }
    
    rl.close();
}

main().catch((error) => {
    console.error('Terjadi kesalahan:', error);
    rl.close();
});

process.on('SIGINT', () => {
    console.log('\n\nProgram dihentikan');
    rl.close();
    process.exit(0);
});


console.log('Format: ');
console.log('Ketik "keluar" untuk mengakhiri\n');
askDate();




