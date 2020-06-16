<template>
    <div :class="[small?'avatar-image-small':'avatar-image', rounded?'avatar-image-rounded':'']" class="fit-image" :style="`background-image: url(${url})`">

    </div>
</template>

<script>
    export default {
        name: "AvatarImage",
        props: ['small','url','rounded']
    }
</script>

<style scoped>
.fit-image{
    background-size: cover;
    background-position:center ;
}
.avatar-image-small{
    border-radius: 5rem;
    border: solid 4px green;
    height: 50px;
    width: 50px;
}
.avatar-image-rounded{
    border-radius:8rem;
}
.avatar-image{
    border-radius: 1rem;
    border: solid 4px green;
    height: 200px;
    width: 200px;
}
@media screen and (max-width: 600px){
    .avatar-image{
        width: 150px;
        height:150px;
    }
}
</style>
