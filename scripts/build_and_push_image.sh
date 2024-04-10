#!/bin/bash

# Inicializar las variables
region=""
project_id=""
repository=""
image_name=""
tag=""
directory=""

# Analizar los argumentos
for arg in "$@"
do
    case $arg in
        --region=*)
        region="${arg#*=}"
        shift
        ;;
        --project_id=*)
        project_id="${arg#*=}"
        shift
        ;;
        --repository=*)
        repository="${arg#*=}"
        shift
        ;;
        --image_name=*)
        image_name="${arg#*=}"
        shift
        ;;
        --tag=*)
        tag="${arg#*=}"
        shift
        ;;
        --directory=*)
        directory="${arg#*=}"
        shift
        ;;
    esac
done

echo "REGION: $region"
echo "PROJECT_ID: $project_id"
echo "REPOSITORY: $repository"
echo "IMAGE_NAME: $image_name"
echo "TAG: $tag"
echo "DIRECTORY: $directory"

# Cambiar al directorio del microservicio
cd $directory
ls 

# Construir la imagen Docker
docker build -t $image_name:latest .

# Etiquetar la imagen con la etiqueta de Git
docker tag $image_name:latest $region/$project_id/$repository/$image_name:latest
docker tag $image_name:latest $region/$project_id/$repository/$image_name:$tag

# Empujar la imagen a Artifact Registry
docker push $region/$project_id/$repository/$image_name:latest
docker push $region/$project_id/$repository/$image_name:$tag

