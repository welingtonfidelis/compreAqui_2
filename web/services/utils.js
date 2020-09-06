import axios from 'axios';

export default {
  async getCep(cep) {
    if (cep && cep !== '') {
      cep = (cep.replace(/\D/g, ''));

      if (cep.length === 8) {
        try {
          const query = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

          const { erro } = query.data;
          if (erro) return null;
          else return query.data;

        } catch (error) {
          console.warn(error);
        }
      }
    }

    return null;
  },

  maskValue(value) {
    return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  },

  maskDate(date) {
    return Intl.DateTimeFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(date);
  },

  dateStringBRtoEN(date) {
    const tmp = date.split('/');
    return `${tmp[2]}/${tmp[1]}/${tmp[0]}`;
  },

  async fileToBase64(file) {
    console.log('-->', file);
    const result_base64 = await new Promise((resolve) => {
      const fileReader = new FileReader();
      fileReader.onload = (e) => resolve(fileReader.result);
      fileReader.readAsDataURL(file);
    });

    return result_base64;
  }
}