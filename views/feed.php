<?php include '_layout/head.php' ?>
<?php include '_layout/header.php' ?>
<?php include '_layout/menu.php' ?>
<section id="feed">
    <div class="container grid">
        <div class="post">

        </div>
    </div>
</section>
<script src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js"></script>
<script type="text/javascript">
    $('.grid').masonry({
    itemSelector: '.grid-item',
    columnWidth: 200
    });
</script>
<?php include '_layout/footer.php' ?>
