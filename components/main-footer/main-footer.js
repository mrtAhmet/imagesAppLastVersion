import classes from "./main-footer.module.css";
export default function MainFooter() {
  return (
    <>
      <div className={classes.footerMain}>
        <div className={classes.copyright}>
          <label>Copyright © By Ahmet M.</label>
        </div>
        <div className={classes.version}>
          <label>Version : Beta 1.0</label>
        </div>
      </div>
    </>
  );
}
