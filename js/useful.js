export function isRectangleInside(
  [xA, yA] = [0, 0], [widthA, heightA] = [0, 0],
  [xB, yB] = [0, 0], [widthB, heightB] = [0, 0],
){
    
//get react
  let getPoints = ( [x, y], [width, height] ) => { return [ x + width, y + height ] }
  
  const [rightA, bottomA] = getPoints( [xA, yA], [widthA, heightA] );  
  const [rightB, bottomB] = getPoints( [xB, yB], [widthB, heightB] );  

//verification
  const isInside = (
    xA >= xB && yA >= yB &&
    rightA <= rightB && bottomA <= bottomB
  );
  
  return isInside;
}
  