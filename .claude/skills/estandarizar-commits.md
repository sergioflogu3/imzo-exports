---
name: estandarizar-commits
description: Estandariza mensajes de commits con formato e intención definida
triggers:
  - commit
  - hacer commit
  - haz commit
  - haz commit de mis cambios
---

# Estandarizar Commits

Skill exclusiva para este proyecto que estandariza todos los commits.

## Flujo

### 1. Verificar rama

Ejecutar: `git status` o `git branch`

**Si está en `main` o `master`:**
- Preguntarle: "¿Quieres hacer commit en rama principal o prefieres cambiar de rama?"
- Si quiere cambiar: proponer nombre de rama (ej: `feat/nueva-feature`, `fix/bug-xyz`)
- Crear rama si es necesario

**Si NO está en main/master:** Continuar al paso 2.

### 2. Verificar cambios unstaged

Ejecutar: `git status`

**Si hay cambios sin staging:**
- Detener
- Informar: "Tienes cambios que no se encuentran en staging"
- No continuar

**Si NO hay:** Continuar al paso 3.

### 3. Verificar staging area

**Si hay cambios en staging:** Continuar al paso 4.

**Si NO hay cambios:** Informar "No se encuentran cambios disponibles para hacer commit" y detener.

### 4. Generar mensaje de commit

Estructura:
```
[INTENCIÓN] Mensaje breve de lo que se hizo

- Cambio 1
- Cambio 2
- ...

Razones:
- Razón 1
- Razón 2
```

**Intenciones permitidas:**
- `Feat` → nueva funcionalidad
- `Bugfix` → corrección de bug
- `Refactor` → refactorización de código
- `Test` → cambios en tests
- `Doc` → cambios en documentación
- `Design` → cambios en diseño/estilos

### 5. Crear commit

Una vez confirmado mensaje, ejecutar `git commit -m "..."` con el mensaje formateado.

Incluir atribución:
```
Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```
