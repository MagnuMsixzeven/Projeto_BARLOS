(function () {
    function maskPhone(value) {
        const d = String(value || '').replace(/\D/g, '').slice(0, 11);
        if (d.length <= 2) return d;
        if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
        if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
        return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7, 11)}`;
    }

    function maskCpf(value) {
        const d = String(value || '').replace(/\D/g, '').slice(0, 11);
        if (d.length <= 3) return d;
        if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
        if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
        return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9, 11)}`;
    }

    function ensureEmailSuggestions() {
        if (document.getElementById('bbEmailSuggestions')) return;
        const dl = document.createElement('datalist');
        dl.id = 'bbEmailSuggestions';
        ['nome@gmail.com', 'nome@hotmail.com', 'nome@outlook.com'].forEach(function (value) {
            const opt = document.createElement('option');
            opt.value = value;
            dl.appendChild(opt);
        });
        document.body.appendChild(dl);
    }

    function applyFieldStandards(root) {
        const scope = root || document;
        ensureEmailSuggestions();

        scope.querySelectorAll('input').forEach(function (input) {
            const type = String(input.type || '').toLowerCase();
            const name = String(input.name || '').toLowerCase();
            const id = String(input.id || '').toLowerCase();

            const isPhone = type === 'tel' || name.includes('telefone') || name.includes('cel') || id.includes('tel');
            const isCpf = name.includes('cpf') || id.includes('cpf');
            const isEmail = type === 'email' || name.includes('email') || id.includes('email');

            if (isPhone) {
                input.setAttribute('maxlength', '15');
                input.setAttribute('inputmode', 'numeric');
                input.setAttribute('autocomplete', 'tel');
                if (!input.placeholder || input.placeholder.toLowerCase().includes('exemplo')) {
                    input.placeholder = '(11) 99999-9999';
                }
                if (!input.dataset.bbPhoneMask) {
                    input.addEventListener('input', function () {
                        this.value = maskPhone(this.value);
                    });
                    input.dataset.bbPhoneMask = '1';
                }
                input.value = maskPhone(input.value);
            }

            if (isCpf) {
                input.setAttribute('maxlength', '14');
                input.setAttribute('inputmode', 'numeric');
                if (!input.placeholder) {
                    input.placeholder = '000.000.000-00';
                }
                if (!input.dataset.bbCpfMask) {
                    input.addEventListener('input', function () {
                        this.value = maskCpf(this.value);
                    });
                    input.dataset.bbCpfMask = '1';
                }
                input.value = maskCpf(input.value);
            }

            if (isEmail) {
                input.setAttribute('maxlength', '120');
                input.setAttribute('autocomplete', 'email');
                input.setAttribute('list', 'bbEmailSuggestions');
                if (!input.placeholder || input.placeholder.includes('@exemplo') || input.placeholder.includes('seu@email')) {
                    input.placeholder = 'nome@gmail.com ou nome@hotmail.com';
                }
            }
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        applyFieldStandards(document);
    });

    window.applyFieldStandards = applyFieldStandards;
})();
